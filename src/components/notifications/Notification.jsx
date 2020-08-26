import React from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { dismiss } from '../../actions/notification';

const propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  severity: PropTypes.string,
  timeToLiveInSeconds: PropTypes.number
}

const defaultProps = {
  severity: 'info',
  timeToLiveInSeconds: null
}

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 8px 16px;
  margin: 8px;
  border-radius: 5px;
  background-color: ${props => props.color};
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12),
              0 4px 4px rgba(0,0,0,0.12),
              0 8px 8px rgba(0,0,0,0.12),
              0 16px 16px rgba(0,0,0,0.12);
`;

const CloseIcon = styled.i`
  float: right;
  color: white;
`;

const Message = styled.h5`
  color: white;
`;

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.dismissSelf = this.dismissSelf.bind(this);
    this.scheduleDismiss = this.scheduleDismiss.bind(this);
    if (props.timeToLiveInSeconds != null) {
      this.scheduleDismiss(props.timeToLiveInSeconds);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timeToLiveInSeconds == this.props.timeToLiveInSeconds ||
        this.props.timeToLiveInSeconds == null) {
      return;
    }

    this.scheduleDismiss(this.props.timeToLiveInSeconds);
  }

  getColor(severity) {
    switch(severity) {
      case 'warning':
        return this.props.theme.orange;
      case 'error':
        return this.props.theme.red;
      default:
        return this.props.theme.primaryColor;
    }
  }

  dismissSelf() {
    this.props.dispatch(dismiss(this.props.id));
  }

  scheduleDismiss(timeToLiveInSeconds) {
    setTimeout(this.dismissSelf, timeToLiveInSeconds * 1000);
  }

  render() {
    let color = this.getColor(this.props.severity);

    return (
      <Container className={this.props.className} color={color}>
        <CloseIcon className="fas fa-times" onClick={this.dismissSelf}/>
        <Message>{this.props.message}</Message>
      </Container>
    );
  }
}

Notification.propTypes = propTypes

export default withTheme(connect()(Notification));
