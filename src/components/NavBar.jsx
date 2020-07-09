import React from 'react';
import styled from 'styled-components';
import { logout as logoutAction } from '../actions/auth';
import TextButton from './buttons/TextButton';

const NavigationBar = styled.div`
  height: 50px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr [logout] 100px;

  background-color: ${props => props.theme.lightBlack};
`;

const Logout = styled(TextButton)`
  grid-column: logout;
  float: right;
  max-width: 100px;

  &:hover {
    cursor: pointer;
  }
`;

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    let { dispatch } = this.props;
    dispatch(logoutAction());
  }

  render() {
    return (
      <NavigationBar>
        <Logout onClick={this.logout}>Logout</Logout>
      </NavigationBar>
    );
  }
}

export default NavBar;