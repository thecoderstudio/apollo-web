import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  options: PropTypes.array.isRequired,
  optionSelectedCallback: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
};

const Wrapper = styled.div`
  position: relative;
`;

const DropDownButton = styled.div`
  border: none;
  border-radius: 5px;
  color: ${props => props.theme.white};
  cursor: pointer;

  padding: 15px;
  background-color: ${props => props.theme.lightBlack};

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const DropDownContent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  width: 230px;
  box-shadow: ${props => props.theme.boxShadow};
  z-index: 1;

  color: ${props => props.theme.white};
  background-color: ${props => props.theme.lightBlack};
  border-radius: 4px;

  position: absolute;
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
  transform: ${props => (props.collapsed ? 'rotate(0)' : 'rotate(180deg)')};
  transition: transform 0.3s;
`;

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
    this.node = React.createRef();
    this.closeDropdown = this.closeDropdown.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closeDropdown, false);
  }

  closeDropdown(e) {
    const { collapsed } = this.state;
    if (!collapsed && !this.node.current.contains(e.target)) {
      this.setState({ collapsed: true });
    }
  }

  toggleCollapse() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  selectItem(option) {
    const { optionSelectedCallback } = this.props;

    this.toggleCollapse();
    optionSelectedCallback(option);
  }

  renderItems() {
    const { options, selected } = this.props;

    return options.map(option => {
      if (option === selected) { return; }
      return (
        <DropDownItem key={option} onClick={() => this.selectItem(option)}>
          {option}
        </DropDownItem>
      );
    });
  }

  render() {
    const { className, selected } = this.props;
    const { collapsed } = this.state;
    return (
      <Wrapper className={className} ref={this.node}>
        <DropDownButton id='dropdown' onClick={this.toggleCollapse}>
          {selected}
          <DropDownIcon collapsed={collapsed} />
        </DropDownButton>
        {!collapsed
          && (
          <DropDownContent>
            {this.renderItems()}
          </DropDownContent>
          )}
      </Wrapper>
    );
  }
}

Dropdown.propTypes = propTypes;

export default Dropdown;
