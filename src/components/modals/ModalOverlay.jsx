import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
  closeModalFunction: PropTypes.func.isRequired
};

const Overlay = styled.div`
  display: inline;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${props => props.theme.overlay};
`;

export default class ModalOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.node = React.createRef();
  }

  closeModal(e) {
    if (this.node.current === e.target) {
      this.props.closeModalFunction();
    }
  }

  render() {
    return (
      <Overlay ref={this.node} onClick={this.closeModal}>
        {this.props.children}
      </Overlay>
    );
  }
}

ModalOverlay.propTypes = propTypes;
