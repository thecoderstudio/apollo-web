import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AgentListItem from './AgentListItem';
import Button from '../buttons/Button';
import { listAgents as listAgentsAction } from '../../actions/agent';
import { handleError } from '../../actions/error';
import AddAgentModal from '../modals/add-agent/AddAgentModal';
import media from '../../util/media';

const Content = styled.div`
  display: grid;
  grid-template-rows: [header] 50px [list] 1fr;
  width: 100%;
  min-width: 0;
  background-color: ${props => props.theme.lightBlack};
  border-radius: 8px;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-row: header;
`;

const List = styled.ul`
  width: 100%;
  min-width: 0;
  grid-row: list;
  list-style: none;
  padding-left: 0;
`;

const NewAgentButton = styled(Button)`
  max-width: 250px;

  ${
    media.phone`
      max-width: 100%;
    `
  }
`;

class AgentList extends React.Component {
  constructor(props) {
    super(props);
    this.generateAgents = this.generateAgents.bind(this);
    this.dispatchListAgents = this.dispatchListAgents.bind(this);
    this.openAddAgentModal = this.openAddAgentModal.bind(this);
    this.closeAddAgentModal = this.closeAddAgentModal.bind(this);
    this.setupWebSocket();
    this.state = { showAddAgent: false };
  }

  openAddAgentModal() {
    this.setState({ showAddAgent: true });
  }

  closeAddAgentModal() {
    this.setState({ showAddAgent: false });
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
        <Header>
          <h2>Agents</h2>
          <NewAgentButton id='newAgentButton' onClick={this.openAddAgentModal}>Add new agent</NewAgentButton>
        </Header>
        <List>
          {this.generateAgents(this.props.agents)}
        </List>
        {this.state.showAddAgent && <AddAgentModal onClose={this.closeAddAgentModal} />}
      </Content>
    );
  }
}

export default connect(
  state => ({agents: state.agent})
)(AgentList);
