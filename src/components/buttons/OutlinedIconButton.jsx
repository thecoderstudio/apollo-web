import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OutlinedButton from './OutlinedButton';
import media from '../../util/media';

const propTypes = {
  iconClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

const ButtonContent = styled.span`
  margin-left: 8px;

  ${
    media.phone`
      display: none;
    `
  }
`;

function OutlinedIconButton(props) {
  return (
    <OutlinedButton className={props.className} onClick={props.onClick}>
      <i className={props.iconClassName}/><ButtonContent>{props.children}</ButtonContent>
    </OutlinedButton>
  );
}

OutlinedButton.propTypes = propTypes;

export default OutlinedIconButton;