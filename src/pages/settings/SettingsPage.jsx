import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import UserSettings from './UserSettings';
import PathAwareLink from '../../components/links/PathAwareLink';
import NotFound from '../NotFound';

const propTypes = {
  location: PropTypes.object.isRequired
};

const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: grid;
  position: relative;
  grid-template-columns: [navigation] 225px [content] 1fr;
`;

const StyledNavigation = styled(SideNavigation)`
  grid-column: navigation;
  position: absolute;
  top: 0;
  bottom: 0;
`;

const ComponentWrapper = styled.div`
  grid-column: content;
  padding: 16px;
`;

export default function SettingsPage(props) {
  const { location, match } = props;
  return (
    <ContentWrapper>
      <StyledNavigation>
        <PathAwareLink
          location={location}
          to='/settings/user_settings'
          iconClassName='fas fa-user-cog'
        >
          User settings
        </PathAwareLink>
      </StyledNavigation>
      <ComponentWrapper>
        <Switch>
          <Route exact path={`${match.url}/user_settings`} component={UserSettings} />
          <Route component={NotFound} />
        </Switch>
      </ComponentWrapper>
    </ContentWrapper>
  );
}

SettingsPage.propTypes = propTypes;
