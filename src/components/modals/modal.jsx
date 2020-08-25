import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../Card';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

const ModalOverlay = styled.div`
  display: inline;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: ${props => props.theme.overlay};
`;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: [title] 50px [content] 1fr;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 600px;
  height: auto;
  background-color: ${props => props.theme.black}
`;

const Title = styled.h2`
  grid-row: title;
  width: 75%;
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.div`
  grid-row: content;
  padding: 20px;
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

Modal.propTypes = propTypes;

export default connect()(Modal);