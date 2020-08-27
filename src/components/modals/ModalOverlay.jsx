import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Overlay = styled.div`
  display: inline;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.overlay};
`;

export default function ModalOverlay(props) {
  return (
    <Overlay>
      {props.children}
    </Overlay>
  );
}

ModalOverlay.propTypes = propTypes;

