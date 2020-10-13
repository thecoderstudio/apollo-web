import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import media from '../util/media';
import PathAwareLink from './links/PathAwareLink';

const propTypes = {
  location: PropTypes.object.isRequired
};

const Navigation = styled.div`
  max-width: 225px;
  width: 100%;
  background-color: ${props => props.theme.lightBlack};
  box-shadow: inset ${props => props.theme.boxShadow};
  padding-top: 32px;
  transition: 0.75s ease-in-out;
  overflow: hidden;

  ${media.phone`
    width: 45px;
  `}
`;

export default function SettingsSideNavigation(props) {
  const { className, location } = props;

  return (
    <Navigation className={className}>
      <PathAwareLink location={location} to='/settings/user_settings'>User settings</PathAwareLink>
    </Navigation>
  );
}

SettingsSideNavigation.propTypes = propTypes;
