import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../actions/auth';
import { showAddAgentModal } from '../actions/add-agent';

import Button from './buttons/Button';
import OutlinedButton from './buttons/OutlinedButton';
import AddAgentModal from './modals/AddAgentModal';

const NavigationBar = styled.div`
  height: 50px;
  padding: 10px;
  display: grid;
  grid-template-columns: [rest] 1fr [new-agent] 300px [logout] 100px;

  background-color: ${props => props.theme.lightBlack};
`;

const Logout = styled(OutlinedButton)`
  grid-column: logout;
  float: right;
  width: 100px;
`;

const NewAgentButton = styled(Button)`
  grid-column: new-agent;

  margin-left: 25px;
  margin-right: 25px;
  max-width: 250px;
`;

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.openAddAgentModal = this.openAddAgentModal.bind(this);
    this.state = { addingAgent: false }
  }

  openAddAgentModal() {
    let { dispatch } = this.props;
    this.setState({ addingAgent: true })
    dispatch(showAddAgentModal());
  }

  logout() {
    let { dispatch } = this.props;
    dispatch(logoutAction());
  }

  render() {
    return (
      <NavigationBar>
        <NewAgentButton id='newAgentButton' onClick={this.openAddAgentModal}>Add new agent</NewAgentButton>
        <Logout id='logoutButton' onClick={this.logout}>Logout</Logout>
        {this.state.addingAgent && <AddAgentModal />}
      </NavigationBar>
    );
  }
}

export default connect()(NavBar);
