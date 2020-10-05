import React from 'react';
import styled from 'styled-components';
import SettingsSideNavigation from '../pages/settings/SettingsSideNavigation';
import media from '../util/media';

const ContentWrapper = styled.div`
  display: grid;
  grid-template-column: [navigation] 300px [content] 1fr;
`;

const StyledNavigation = styled(SettingsSideNavigation)`
  grid-column: navigation;
`;

const ComponentWrapper = styled.div`
  grid-column: content;
`;


function WithSettingsNavigation(Component) {
  return function wrap(props) {
    return (
      <ContentWrapper>
        <StyledNavigation/>
        <ComponentWrapper>
          <Component />
        </ComponentWrapper>
      </ContentWrapper>
    );
  }
}

export default WithSettingsNavigation;