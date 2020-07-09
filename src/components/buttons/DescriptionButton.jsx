import React from 'react';
import OutlinedButton from './OutlinedButton';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

const StyledOutlinedButton = styled(OutlinedButton)`
  background-color: transparent;
  border: 1px solid ${props => props.theme.accent};

  display: grid;
  grid-template-rows: [title] 100px [description] 1fr;
`;


const Title = styled.h1`
  grid-row: title;
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const Description = styled(Text)`
  grid-row: description;
  padding: 10px;
`;

function DescriptionButton(props) {
  return (
    <StyledOutlinedButton>
      <Title>{props.title}</Title>
      <Description>{props.children}</Description>
    </StyledOutlinedButton>
  );
};

DescriptionButton.propTypes = propTypes;

export default DescriptionButton;