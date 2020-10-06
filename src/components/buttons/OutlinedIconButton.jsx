import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OutlinedButton from './OutlinedButton';
import media from '../../util/media';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  iconClassName: PropTypes.string.isRequired
};

const ButtonContent = styled.span`
  margin-left: 8px;

  ${media.phone`
    display: none;
  `}
`;

function OutlinedIconButton(props) {
  const {
    className, iconClassName, onClick, children
  } = props;
  return (
    <OutlinedButton className={className} onClick={onClick}>
      <i className={iconClassName} />
      <ButtonContent>{children}</ButtonContent>
    </OutlinedButton>
  );
}

OutlinedIconButton.propTypes = propTypes;

export default OutlinedIconButton;
