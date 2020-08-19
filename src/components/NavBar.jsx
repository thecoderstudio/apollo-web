import React from 'react';
import { connect } from 'react-redux';
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

const Link = styled.a`
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
  }

  logout() {
    let { dispatch } = this.props;
    dispatch(logoutAction());
  }

  render() {
    return (
      <NavigationBar>
        <h3>Apollo</h3>
        <div>
          <Link href='/'>Dashboard</Link>
          <Link href='/admin'>Admin</Link>
        </div>
        <Logout onClick={this.logout}>Log out</Logout>
      </NavigationBar>
    );
  }
}

export default connect()(NavBar);
