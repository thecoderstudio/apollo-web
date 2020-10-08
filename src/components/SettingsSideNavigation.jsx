import React from 'react';
import styled from 'styled-components';
import { matchPath } from 'react-router';
import Link from './Link';
import Icon from './Icon';
import media from '../util/media';

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

const StyledIcon = styled(Icon)`
  margin: 0 8px;

  ${media.phone`
    margin: 0 auto;
  `}
`;

const StyledLink = styled(({ active, ...props }) => <Link {...props} />)`
  padding: 12px;
  margin-tpropsx;
  border-radius: 4px;
  width: 100%;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  box-spropsborder-box;
  white-space: nowrap;

  background-color: ${props => props.active ? props.theme.selectedBlack : props.theme.lightBlack};

  &:hover {
    background-color: ${props => props.theme.selectedBlack};
  }
`;

const TextWrapper = styled.span`
  margin: 0 8px;

  ${media.phone`
    display: none;
  `}
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
          <StyledIcon className="fas fa-user-cog" />
          <TextWrapper>User settings</TextWrapper>
        </StyledLink>
      </Navigation>
    );
  }
}

export default SettingsSideNavigation;
