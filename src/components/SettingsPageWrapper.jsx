import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import SettingsSideNavigation from "./SettingsSideNavigation";
import media from '../util/media';

const propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: grid;
  position: relative;
  grid-template-columns: [navigation] 225px [content] 1fr;
  transition: 0.75s ease-in-out;

  ${media.phone`
    grid-template-columns: [navigation] 45px [content] 1fr;
  `}
`;

const StyledNavigation = styled(SettingsSideNavigation)`
  grid-column: navigation;
  position: absolute;
  top: 0;
  bottom: 0;
`;

const ComponentWrapper = styled.div`
  grid-column: content;
  padding: 16px;
`;

export default function SettingsPageWrapper(props) {
  const { location, children } = props;
  return (
    <ContentWrapper>
      <Switch>
        <StyledNavigation location={location} />
      </Switch>
      <ComponentWrapper>
        {children}
      </ComponentWrapper>
    </ContentWrapper>
  );
}

SettingsPageWrapper.propTypes = propTypes;
