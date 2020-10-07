import React from 'react';
import styled from 'styled-components';
import { matchPath } from 'react-router';
import Link from '../../components/Link';

const Navigation = styled.div`
  max-width: 300px;
  width: 100%;
  background-color: ${(props) => props.theme.lightBlack};
  box-shadow: inset 0px 0px 5px -1px #000000;
  padding-top: 32px;
  position: relative;
`;

const StyledLink = styled(({ active, ...props }) => <Link {...props} />)`
  padding: 16px;
  width: 100%;
  max-width: 100%;
  float: left;
  box-sizing: border-box;
  background-color: ${(props) => props.active ? props.theme.selectedBlack : props.theme.lightBlack};

  &:hover {
    background-color: ${(props) => props.theme.selectedBlack};
  }
`;

class SettingsSideNavigation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkIfPathIsActive = this.checkIfPathIsActive.bind(this);
  }

  checkIfPathIsActive(path) {
    const { location } = this.props;
    const match = matchPath(location.pathname, {
      path,
      exact: true,
      strict: false
    });
    if (!match) {
      return false;
    }
    return match.isExact;
  }

  render() {
    const { className } = this.props;
    return (
      <Navigation className={className}>
        <StyledLink
          active={this.checkIfPathIsActive('/settings/user_settings')}
          to="/settings/user_settings"
        >
          User settings
        </StyledLink>
        <StyledLink
          active={this.checkIfPathIsActive('/settings/user_settingss')}
          to="/settings/user_settings/kut"
        >
          User settings
        </StyledLink>
        <StyledLink
          active={this.checkIfPathIsActive('/settings/user_settingss')}
          to="/settings/user_settings"
        >
          User settings
        </StyledLink>
      </Navigation>
    );
  }
}

export default SettingsSideNavigation;
