import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout as logoutAction } from '../actions/auth';
import { showAddAgentModal } from '../actions/addAgentModal'
import Button from './buttons/Button';
import OutlinedButton from './buttons/OutlinedButton';
import AddAgentModal from './add-agent/addAgentModal';

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
  max-width: 100px;

  &:hover {
    cursor: pointer;
  }
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
    this.state = { modalVisible: false };
  }

  openAddAgentModal() {
    let { dispatch } = this.props;
    dispatch(showAddAgentModal())
  }

  logout() {
    dispatch(logoutAction())
  }

  render() {
    return (
      <NavigationBar>
        <NewAgentButton onClick={this.openAddAgentModal}>Add new agent</NewAgentButton>
        <Logout onClick={this.logout}>Logout</Logout>
        <AddAgentModal />
      </NavigationBar>
    );
  }
}

export default connect(
  state => ({ modalVisible: state.addAgentModalVisible})
)(NavBar);