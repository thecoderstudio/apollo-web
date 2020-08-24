import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout as logoutAction } from '../actions/auth';
import { removeCurrentUser } from '../actions/current-user';
import OutlinedButton from './buttons/OutlinedButton';
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

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.checkIfAdmin = this.checkIfAdmin.bind(this);
  }

  logout() {
    let { dispatch } = this.props;
    dispatch(logoutAction());
    dispatch(removeCurrentUser());
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
        <h3>Apollo</h3>
        <div>
          <StyledLink to='/'>Dashboard</StyledLink>
          {this.checkIfAdmin() && <StyledLink to='/admin'>Admin</StyledLink>}
        </div>
        <Logout onClick={this.logout}>Log out</Logout>
      </NavigationBar>
    );
  }
}

export default connect(
  state => ({ currentUser: state.currentUser })
)(NavBar);