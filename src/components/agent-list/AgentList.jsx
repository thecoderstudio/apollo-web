import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AgentListItem from './AgentListItem';
import { listAgents as listAgentsAction } from '../../actions/agent';

const Content = styled.div`
  display: grid;
  grid-template-rows: [title] 50px [list] 1fr;

  background-color: ${props => props.theme.lightBlack};
  border-radius: 8px;
  maring: 20px;

  padding: 20px;
`;

const ListTitle = styled.h2`
  grid-row: title;
`;

const List = styled.ul`
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
    server.onmessage = (event) => {
      this.dispatchListAgents(event.data);
    };
  }

  generateAgents(agents) {
    return agents.map(agent => {
      return <AgentListItem key={agent.id} agentName={agent.name} connectionState={agent.connection_state} />;
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