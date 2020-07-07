import media from '../util/media';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../actions/auth';
import React from 'react'
import Text from '../components/Text';

const NavigationBar = styled.div`
  height: 100px;
  padding: 25px; 
  grid-template-rows: 1fr [options] 200px; 

`;

const DropDownWrapper = styled.div`
  grid-row: options;

  width: 150px;
  position: relative;
  display: inline-block;
`;

const NameHolder = styled(Text)`
  &:hover {
    
  }
`;


const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropDownItem = styled.div`
  display: block;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    let { dispatch } = this.props
    dispatch(logout())
  }

  render() {
    return (
      <NavigationBar>
        <DropDownWrapper>
          <NameHolder>Name</NameHolder>
          <DropDownContent>
            <DropDownItem>Logout</DropDownItem>
          </DropDownContent>
        </DropDownWrapper>
      </NavigationBar>
    );
  }
}

export default connect(
  state => ({ authenticated: state.authenticated })
)(NavBar) 