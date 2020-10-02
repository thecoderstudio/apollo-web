import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import media from '../util/media';
import { logout as logoutAction } from '../actions/auth';
import Button from './buttons/Button';
import { removeCurrentUser } from '../actions/current-user';
import checkIfAdmin from '../util/admin';
import OutlinedButton from './buttons/OutlinedButton';
import AddAgentModal from './modals/add-agent/AddAgentModal';
import Link from './Link';

const NavigationBar = styled.div`
  padding: 16px;
  background-color: ${props => props.theme.lightBlack};
  display: grid;
  grid-template-columns: [logo] 200px [content] 1fr;
  grid-gap: 16px;
  align-items: center;
  z-index: 1;

  ${
    media.phone`
      grid-template-columns: [main] 1fr [toggle] 24px;
      grid-template-rows: [logo] 50px [content] 1fr;

      position: ${props => props.collapsed ? 'static' : 'fixed'};
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: ${props => props.collapsed ? 'static' : '0px'};
    `
  }
`;

const NavBarContent = styled.div`
  grid-column: content;
  display: grid;
  grid-template-columns: [menu] 1fr [new-agent] 250px [logout] 100px;
  grid-gap: 12px;
  height: auto;

  ${
    media.phone`
      display: ${props => props.collapsed ? 'none' : 'grid'};
      grid-column: main / -1;
      grid-row: content;
      height: 100%;

      grid-template-columns: [main] 1fr;
      grid-template-rows: [menu] 1fr [new-agent] 50px [logout] 50px;
      maring-bottom: 32px;
    `
  }
`;

const MenuToggleIcon = styled.i`
  grid-row: logo;
  grid-column: toggle;
  display: none;
  position: relative;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  transform: ${props => props.collapsed ? 'rotate(0deg)' : 'rotate(90deg)'};
  transition: transform .3s ease-out;
  ${
    media.phone`
      display: inline;
    `
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  maring-left: 16px;
  margin-right: 16px;
`;

const StyledIcon = styled.i`
  width: 32px;
`;

const Menu = styled.div`
  grid-column: menu;
  align-self: center;

  ${
    media.phone`
      align-self: start;
      grid-column: main;
      grid-row: menu;
      margin-top: 32px;
    `
  }
`;

const Logo = styled.div`
  grid-column: logo;

  ${
    media.phone`
      grid-column: main;
      grid-row: logo;
    `
  }
`;

const Logout = styled(OutlinedButton)`
  grid-column: logout;
  float: right;
  max-width: 100px;

  ${
    media.phone`
      grid-column: main;
      grid-row: logout;
      max-width: 100%;
    `
  }
`;

const NewAgentButton = styled(Button)`
  grid-column: new-agent;
  max-width: 250px;

  ${
    media.phone`
      grid-column: main;
      grid-row: new-agent;
      max-width: 100%;
    `
  }
`;

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.openAddAgentModal = this.openAddAgentModal.bind(this);
    this.closeAddAgentModal = this.closeAddAgentModal.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.state = { showAddAgent: false, collapsed: false };
  }

  openAddAgentModal() {
    this.setState({ showAddAgent: true });
  }

  logout() {
    let { dispatch } = this.props;
    dispatch(logoutAction());
    dispatch(removeCurrentUser());
  }

  closeAddAgentModal() {
    this.setState({ showAddAgent: false });
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <NavigationBar collapsed={this.state.collapsed}>
        <Logo>Apollo</Logo>
        <MenuToggleIcon collapsed={this.state.collapsed} onClick={this.toggleCollapsed} className={this.state.collapsed ? 'fa fa-bars fa-lg' : 'fas fa-times fa-lg'}/>
        <NavBarContent collapsed={this.state.collapsed}>
          <Menu>
            <StyledIcon className='fas fa-home' /><StyledLink to='/'>Dashboard</StyledLink>
            {checkIfAdmin() && <StyledLink to='/admin'>Admin</StyledLink>}
          </Menu>
          <NewAgentButton id='newAgentButton' onClick={this.openAddAgentModal}>Add new agent</NewAgentButton>
          <Logout id='logoutButton' onClick={this.logout}>Logout</Logout>
          {this.state.showAddAgent && <AddAgentModal onClose={this.closeAddAgentModal} />}
        </NavBarContent>
      </NavigationBar>
    );
  }
}

export default connect(
  state => ({ currentUser: state.currentUser })
)(NavBar);

export { NavBar };