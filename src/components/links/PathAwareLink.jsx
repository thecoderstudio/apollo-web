import React from 'react';
import styled from 'styled-components';
import { matchPath } from 'react-router';
import PropTypes from 'prop-types';
import Link from './Link';
import Icon from '../Icon';
import media from '../../util/media';

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  iconClassName: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

const StyledIcon = styled(Icon)`
  margin: 0 8px;
  ${media.phone`
    margin: 0 auto;
  `}
`;

const StyledLink = styled(({ active, ...props }) => <Link {...props} />)`
  padding: 12px;
  margin-top: 24px;
  border-radius: 4px;
  width: 100%;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
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

export default class PathAwareLink extends React.PureComponent {
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
    const { children, to, iconClassName } = this.props;
    return (
      <StyledLink
        active={this.checkIfPathIsActive(to)}
        to={to}
      >
        <StyledIcon className={iconClassName} />
        <TextWrapper>{children}</TextWrapper>
      </StyledLink>
    );
  }
}

PathAwareLink.propTypes = propTypes;
