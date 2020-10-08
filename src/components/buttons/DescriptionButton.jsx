import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OutlinedButton from './OutlinedButton';

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
  font-size: ${(props) => props.theme.smallTextSize}
`;

function DescriptionButton(props) {
  const {
    className, onClick, title, children
  } = props;
  return (
    <StyledOutlinedButton className={className} onClick={onClick}>
      <Title>{title}</Title>
      <Description>{children}</Description>
    </StyledOutlinedButton>
  );
}

DescriptionButton.propTypes = propTypes;

export default DescriptionButton;
