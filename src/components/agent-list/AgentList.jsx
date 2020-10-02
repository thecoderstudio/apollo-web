import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AgentListItem from './AgentListItem';
import { listAgents as listAgentsAction } from '../../actions/agent';
import { handleError } from '../../actions/error';

const Content = styled.div`
  display: grid;
  grid-template-rows: [title] 50px [list] 1fr;
  width: 100%;
  min-width: 0;

  background-color: ${props => props.theme.lightBlack};
  border-radius: 8px;
  padding: 20px;
`;

const ListTitle = styled.h2`
  grid-row: title;
  width: 100%;
  min-width: 0;
`;

const List = styled.ul`
  width: 100%;
  min-width: 0;
  grid-row: list;
  list-style: none;
  padding-left: 0;
`;

class AgentList extends React.Component {
  constructor(props) {
    super(props);
    this.generateAgents = this.generateAgents.bind(this);
    this.dispatchListAgents = this.dispatchListAgents.bind(this);
    this.setupWebSocket();
  }

  setupWebSocket() {
    let server = new WebSocket(`${process.env.APOLLO_WS_URL}agent`);
    server.onerror = () => {
      handleError("Something went wrong fetching the agent list");
    };
    server.onmessage = (event) => {
      this.dispatchListAgents(event.data);
    };
  }

  generateAgents(agents) {
    return Array.from(agents).map(([id, agent]) => {
      return <AgentListItem key={id} agent={agent} />;
    });
  }

  dispatchListAgents(data) {
    const { dispatch } = this.props;
    dispatch(listAgentsAction(JSON.parse(data)));
  }

  render() {
    return (
      <Content className={this.props.className}>
        <ListTitle>Agents</ListTitle>
        <List>
          {this.generateAgents(this.props.agents)}
        </List>
      </Content>
    );
  }
}

export default connect(
  state => ({agents: state.agent})
)(AgentList);
