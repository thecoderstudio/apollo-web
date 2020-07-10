import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const propTypes = {
  options: PropTypes.array.isRequired
}

const DropDownWrapper = styled.div`
  padding: 15px;
  width: 200px;
`;

const DropDownButton = styled.div`
  border: none;
  border-radius: 5px;
  color: white;
  font-family: 'B612', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  
  min-width: 200px;
  text-align:left;
  padding: 15px;
  background-color: ${props => props.theme.lightBlack};
  
  text-overflow: ellipsis; 
  white-space: nowrap;
  overflow: hidden;
`;

const DropDownContent = styled.ul`
  display: ${props => props.collapsed ? 'none' : 'block'};
  
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  
  width: 230px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1;
  
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.lightBlack};
  border-radius: 4px;
  
  position: fixed;
`;


const DropDownItem = styled.li`
  padding: 15px;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const DropDownIcon = styled.div`
  border-color: white transparent;
	border-style: solid;
	float: right;
	margin-top: 5px;
	border-width: 7px 7px 0px 7px;
	height: 0px;
	width: 0px;
	margin-left: 10px;
  transform: ${props => props.collapsed ? 'rotate(0)' : 'rotate(180deg)'};	
  transition: transform 0.3s;
`;

class DropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.closeDropdown = this.closeDropdown.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.state = { collapsed: true, selected: this.props.children[0] };
  }

  closeDropdown(e) {
    if (!this.state.collapsed && !this.node.contains(e.target)) {
      this.setState({ collapsed: true });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closeDropdown , false);
  }

  toggleCollapse() {
    this.setState({ collapsed : !this.state.collapsed });
  }

  renderItems() {
    console.log(this.props.options)
    return this.props.options.map(option => {
     return <DropDownItem>{option}</DropDownItem>
    });
  }

  render() {
    return(
      <DropDownWrapper ref={node => this.node = node}>
        <DropDownButton onClick={this.toggleCollapse}>s<DropDownIcon collapsed={this.state.collapsed}/></DropDownButton>
        <DropDownContent collapsed={this.state.collapsed}>
          {this.renderItems()}
        </DropDownContent>
      </DropDownWrapper>
    );
  }
}

DropDown.propTypes = propTypes;

export default DropDown;