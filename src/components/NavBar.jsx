import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import media from '../util/media';
import checkIfAdmin from '../util/admin';
import OutlinedButton from './buttons/OutlinedButton';
import { logout } from '../util/auth';
import Link from './Link';
import Icon from './Icon';

const NavigationBar = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.lightBlack};
  display: grid;
  grid-template-columns: [logo] 100px [content] 1fr;
  grid-gap: 16px;
  align-items: center;
  z-index: 1;

  ${media.phone`
    grid-template-columns: [main] 1fr [toggle] 24px;
    grid-template-rows: [logo] 50px [content] 1fr;

    position: ${(props) => props.collapsed ? 'static' : 'fixed'};
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: ${(props) => props.collapsed ? 'auto' : '0px'};
  `}
`;

const NavBarContent = styled.div`
  grid-column: content;
  display: grid;
  grid-template-columns: [menu] 1fr [new-agent] 250px [logout] 100px [settings] 50px;
  grid-gap: 12px;
  height: auto;

  ${media.phone`
    display: ${(props) => props.collapsed ? 'none' : 'grid'};
    grid-column: main / -1;
    grid-row: content;
    height: 100%;

    grid-template-columns: [main] 1fr;
    grid-template-rows: [menu] 1fr [new-agent] 50px [logout] 50px;
  `}
`;

const MenuToggleIcon = styled(Icon)`
  grid-row: logo;
  grid-column: toggle;
  display: none;
  position: relative;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  transform: ${(props) => props.collapsed ? 'rotate(0deg)' : 'rotate(90deg)'};
  transition: transform .3s ease-out;

  ${media.phone`
    display: inline;
  `}

  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  margin: 0px 16px;
  float: left;

  ${media.phone`
    width: 100%;
    margin-bottom: 32px;
  `}
`;

const Menu = styled.div`
  grid-column: menu;
  align-self: center;

  ${media.phone`
    align-self: start;
    grid-column: main;
    grid-row: menu;
    margin-top: 32px;
  `}
`;

const Logo = styled.div`
  grid-column: logo;

  ${media.phone`
    grid-column: main;
    grid-row: logo;
  `}
`;

const Logout = styled(OutlinedButton)`
  grid-column: logout;
  float: right;
  max-width: 100px;

  ${media.phone`
    grid-column: main;
    grid-row: logout;
    max-width: 100%;
  `}
`;

const SettingsIcon = styled(Link)`
  grid-column: settings;
  line-height: 50px;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(95deg);
    cursor: pointer;
  }

  ${
  media.phone`
      display: none;
    `
}
`;

const StyledSettingsLink = styled(StyledLink)`
  display: none;

  ${
  media.phone`
      display: inline;
    `
}
`;

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.state = { collapsed: true };
  }

  toggleCollapsed() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  render() {
    const { collapsed } = this.state;
    const { currentUser } = this.props;

    return (
      <NavigationBar collapsed={collapsed}>
        <Logo>Apollo</Logo>
        <MenuToggleIcon
          id="collapseIcon"
          collapsed={collapsed}
          onClick={this.toggleCollapsed}
          className={collapsed ? 'fa fa-bars fa-lg' : 'fas fa-times fa-lg'}
        />
        <NavBarContent collapsed={collapsed}>
          <Menu>
            <StyledLink onClick={this.toggleCollapsed} to="/">Dashboard</StyledLink>
            {checkIfAdmin(currentUser)
              && <StyledLink onClick={this.toggleCollapsed} to="/admin">Admin</StyledLink>}
            <StyledSettingsLink onClick={this.toggleCollapsed} to="/settings">Settings</StyledSettingsLink>
          </Menu>
          <Logout id="logoutButton" onClick={logout}>Logout</Logout>
          <SettingsIcon className="fas fa-cog fa-lg" to="/settings/user_settings" />
        </NavBarContent>
      </NavigationBar>
    );
  }
}

export default connect(
  (state) => ({ currentUser: state.currentUser })
)(NavBar);

export { NavBar };
