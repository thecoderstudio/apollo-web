import React from 'react';
import OutlinedButton from './OutlinedButton';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallText } from '../Text';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

const StyledOutlinedButton = styled(OutlinedButton)`
  display: grid;
  grid-template-rows: [title] 50px [description] 1fr;
  padding: 20px;
`;

StyledOutlinedButton.displayName = 'OutlinedButton'

const Title = styled.h3`
  grid-row: title;
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const Description = styled(SmallText)`
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