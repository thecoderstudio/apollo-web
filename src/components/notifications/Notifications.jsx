import React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Notification from './Notification';

const propTypes = {
  timeToLiveInSeconds: PropTypes.number
};

const defaultProps = {
  timeToLiveInSeconds: 5
};

const Container = styled(CSSTransitionGroup)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 32px;
  z-index: 2;
`;

const StyledNotification = styled(Notification)`
  margin 8px;

  &.fade-enter {
    opacity: 0.01;
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }

  &.fade-leave {
    opacity: 1;
  }

  &.fade-leave.fade-leave-active {
    opacity: 0.01;
    transition: opacity 200ms ease-in;
  }
`;


function Notifications(props) {
  return (
    <Container
        transitionName="fade"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {props.notifications.keySeq().map((id, index) => (
          <StyledNotification key={id} id={id} timeToLiveInSeconds={props.timeToLiveInSeconds} {...props.notifications.get(id)} />
        ))}
    </Container>
  );
}

Notifications.propTypes = propTypes;
Notifications.defaultProps = defaultProps;

export default connect(({ notifications }) => ({ notifications }))(Notifications);
