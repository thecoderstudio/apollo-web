import media from '../util/media';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../actions/auth';
import { toggleOptions as toggleOptionAction } from '../actions/navbar'
import React from 'react'
import Text from '../components/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const NavigationBar = styled.div`
  height: 50px;
  padding: 10px;
  
  display: grid;
  grid-template-columns: 1fr [options] 300px; 

  background-color: ${props => props.theme.lightBlack};;

  ${
    media.phone`
      grid-template-columns: [options] 1fr; 
    `
  }
`;

const DropDownWrapper = styled.div`
  grid-column: options;
  max-height: 50px;
  padding: 15px;    
  min-width: 200px;
`;

const NameAndOptionWrapper = styled.div`
  float: right;

  &:hover {
    cursor: pointer;
  }
`; 

const NameHolder = styled(Text)`
  margin: 15px;
  line-heigth: 30px;
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Icon = styled(FontAwesomeIcon)`
  transition: transform 0.5s;
  -webkit-transform: ${props => props.collapsed ? 'rotate(0)' : 'rotate(90deg)'};
  -ms-transform: ${props => props.collapsed ? 'rotate(0)' : 'rotate(90deg)'}
  transform: ${props => props.collapsed ? 'rotate(0)' : 'rotate(90deg)'};
`

const DropDownContent = styled.div`
  display: ${props => props.collapsed ? 'none' : 'block'};
  margin-top: 10px;
  padding: 10px;
  float: right;
  min-width: 100px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1;

  color: ${props => props.theme.lightBlack};
  background-color: ${props => props.theme.white};
  border-radius: 4px;

  &:hover {
    background-color: ${props => props.theme.darkWhite};
  }
`;

const DropDownItem = styled.div`
  display: block;
  min-width: 150px;

  &:hover {
    cursor: pointer;
  }
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.state = { collapsed: true };
  }

  toggleDropDown() {
    const { dispatch } = this.props
    dispatch(toggleOptionAction())
  }

  logout() {
    let { dispatch } = this.props
    dispatch(logoutAction())
  }

  render() {
    return (
      <NavigationBar>
        <DropDownWrapper>
          <NameAndOptionWrapper onClick={this.toggleDropDown} >
            <NameHolder>Rik van der Werf</NameHolder>
            <Icon icon={faCog} collapsed={this.props.collapsed} />
          </NameAndOptionWrapper>
          <DropDownContent collapsed={this.props.collapsed}>
            <DropDownItem onClick={this.logout}>Logout</DropDownItem>
          </DropDownContent>
        </DropDownWrapper>
      </NavigationBar>
    );
  }
}

export default connect(
  state => ({ authenticated: state.authenticated, collapsed: state.collapsed })
)(NavBar) 