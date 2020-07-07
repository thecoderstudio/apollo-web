import media from '../util/media';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../actions/auth';
import React from 'react'
import Text from '../components/Text';

const NavigationBar = styled.div`
  height: 100px;
  padding: 25px;
  
  display: grid;
  grid-template-column: 1fr [options] 10px [test] 1fr; 

  background-color: green;
`;

const DropDownWrapper = styled.div`
  grid-column: options;

  position: relative;
  display: inline-block;
  
  background-color: blue
`;

const NameHolder = styled(Text)`
  &:hover {
    
  }

  background-color: red;
`;


const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  background-color: orange;
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
    dispatch(logoutAction())
  }

  render() {
    return (
      <NavigationBar>
        <DropDownWrapper>
          <NameHolder>Name</NameHolder>
          {/* <DropDownContent>
            <DropDownItem>Logout</DropDownItem>
          </DropDownContent> */}
        </DropDownWrapper>
      </NavigationBar>
    );
  }
}

export default connect(
  state => ({ authenticated: state.authenticated })
)(NavBar) 