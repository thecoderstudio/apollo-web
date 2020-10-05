import React from 'react';
import OutlinedButton from './OutlinedButton';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const StyledOutlinedButton = styled(OutlinedButton)`
  display: grid;
  grid-template-rows: [title] 50px [description] 1fr;
  padding: 20px;
  min-height: 180px;
`;

const Title = styled.h3`
  grid-row: title;
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const Description = styled.p`
  grid-row: description;
  padding: 10px;
  font-size: 0.85rem;
`;

function DescriptionButton(props) {
  return (
    <StyledOutlinedButton className={props.className} onClick={props.onClick}>
      <Title>{props.title}</Title>
      <Description>{props.children}</Description>
    </StyledOutlinedButton>
  );
}

DescriptionButton.propTypes = propTypes;

export default DescriptionButton;