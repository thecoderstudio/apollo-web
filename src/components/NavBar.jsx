import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../actions/auth';
import { showAddAgentModal } from '../actions/add-agent';
import Button from './buttons/Button';
import OutlinedButton from './buttons/OutlinedButton';
import AddAgentModal from './modals/AddAgentModal';
import { removeCurrentUser } from '../actions/current-user';
import Link from './Link';

const NavigationBar = styled.div`
  height: 50px;
  padding: 16px;
  display: grid;
  grid-template-columns: [logo] 200px [menu] 1fr [new-agent] 300px [logout] 100px;
  align-items: center;

  background-color: ${props => props.theme.lightBlack};
`;

const StyledLink = styled(Link)`
  margin-right: 16px;
`;

const Menu = styled.div`
  grid-column: menu;
`;

const Logo = styled.div`
  grid-column: logo;
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
    this.checkIfAdmin = this.checkIfAdmin.bind(this);
    this.closeAddAgent = this.closeAddAgent.bind(this);
    this.state = { showAddAgent: false }
  }

  openAddAgentModal() {
    this.setState({ showAddAgent: true })
  }

  logout() {
    let { dispatch } = this.props;
    dispatch(logoutAction());
    dispatch(removeCurrentUser());
  }

  closeAddAgent() {
    console.log("******");
    this.setState({ showAddAgent: false });
  }

  checkIfAdmin() {
    if (this.props.currentUser.role) {
      return this.props.currentUser.role.name === 'admin';
    }

    return false;
  }

  render() {
    return (
      <NavigationBar>
        <Logo>Apollo</Logo>
        <Menu>
          <StyledLink to='/'>Dashboard</StyledLink>
          {this.checkIfAdmin() && <StyledLink to='/admin'>Admin</StyledLink>}
        </Menu>
        <NewAgentButton id='newAgentButton' onClick={this.openAddAgentModal}>Add new agent</NewAgentButton>
        <Logout id='logoutButton' onClick={this.logout}>Logout</Logout>
        {this.state.showAddAgent && <AddAgentModal onClose={this.closeAddAgent} />}
      </NavigationBar>
    );
  }
}

export default connect(
  state => ({ currentUser: state.currentUser })
)(NavBar);
