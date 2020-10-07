import React from 'react';
import styled from 'styled-components';
import SettingsSideNavigation from '../pages/settings/SettingsSideNavigation';
import media from '../util/media';

const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: grid;
  position: relative;
  grid-template-columns: [navigation] 300px [content] 1fr;
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

function WithSettingsNavigation(Component) {
  return function wrap(props) {
    const { location } = props;
    return (
      <ContentWrapper>
        <StyledNavigation location={location} />
        <ComponentWrapper>
          <Component />
        </ComponentWrapper>
      </ContentWrapper>
    );
  };
}

export default WithSettingsNavigation;
