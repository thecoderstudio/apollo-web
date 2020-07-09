import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout as logoutAction } from '../actions/auth';
import OutlinedButton from './buttons/OutlinedButton';

const NavigationBar = styled.div`
  height: 50px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr [logout];

  background-color: ${props => props.theme.lightBlack};
`;

const Logout = styled(OutlinedButton)`
  grid-column: logout;
  float: right;
  width: 100px;
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

export default connect()(NavBar);