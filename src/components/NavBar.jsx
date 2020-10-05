import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import checkIfAdmin from '../util/admin';
import OutlinedButton from './buttons/OutlinedButton';
import { logout } from '../util/auth';
import Link from './Link';

const NavigationBar = styled.div`
  height: 50px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 8fr [logout];
  align-items: center;
  background-color: ${props => props.theme.lightBlack};
`;

const StyledLink = styled(Link)`
  margin-right: 16px;
`;

const Logout = styled(OutlinedButton)`
  grid-column: logout;
  float: right;
  width: 100px;
  height: 75%;
`;

function NavBar(props) {
  return (
    <NavigationBar>
      <h3>Apollo</h3>
      <div>
        <StyledLink to='/'>Dashboard</StyledLink>
        {checkIfAdmin(props.currentUser) &&
        <StyledLink to='/admin'>Admin</StyledLink>}
      </div>
      <Logout id='logoutButton' onClick={logout}>Log out</Logout>
    </NavigationBar>
  );
}

export default connect(
  state => ({ currentUser: state.currentUser })
)(NavBar);