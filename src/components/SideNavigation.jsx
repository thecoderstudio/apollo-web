import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import media from '../util/media';

const propTypes = {
  children: PropTypes.node.isRequired
};

const Navigation = styled.div`
  max-width: 225px;
  width: 100%;
  background-color: ${props => props.theme.lightBlack};
  box-shadow: inset ${props => props.theme.boxShadow};
  padding-top: 32px;
  ${media.phone`
    width: 45px;
  `}

  transition: all 1s ease;
  overflow: hidden;
`;

export default function SideNavigation(props) {
  const { className, children } = props;

  return (
    <Navigation className={className}>
      {children}
    </Navigation>
  );
}

SideNavigation.propTypes = propTypes;
