import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout as logoutAction } from '../actions/auth';
import OutlinedButton from './buttons/OutlinedButton';

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
  text-decoration: none;
  color: ${props => props.theme.white};

  &:hover {
    opacity: 0.90;
  }
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
  }

  checkIfAdmin() {
    if (this.props.currentUser.role) {
      return this.props.currentUser.role.name == 'admin';
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
