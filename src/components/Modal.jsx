import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Card from './Card';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
`;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: [title] 100px [content] 1fr;


  position:fixed;
  background: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

const Title = styled.h1`
  grid-row: content;
  width: 50%;
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.div`
  padding: 25px;
`;

function Modal(props) {

  return (
    <ModalOverlay>
      <StyledCard>
        <Title>{props.title}</Title>
        <Content>{props.children}</Content>
      </StyledCard>
    </ModalOverlay>
  );
}

Modal.propTypes = propTypes

export default Modal