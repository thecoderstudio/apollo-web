import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Card from './Card';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool
};

const defaultProps = {
  visible: false
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;

  display: ${props => props.visible ? 'inline' : 'none'}
`;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: [title] 100px [content] 1fr;

  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);

  width: 600px;
  height: auto;

`;

const Title = styled.h1`
  grid-row: title;
  width: 50%;
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.div`
  grid-row: content;
  padding: 25px;
`;

function AddAgentModal(props) {
  return (
    <ModalOverlay visible={props.visible}>
      <StyledCard>
        <Title>{props.title}</Title>
        <Content>{props.children}</Content>
      </StyledCard>
    </ModalOverlay>
  );
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default AddAgentModal