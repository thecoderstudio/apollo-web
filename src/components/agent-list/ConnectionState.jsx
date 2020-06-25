import React from 'react';
import styled from 'styled-components'
import Text from '../Text'
import PropTypes from 'prop-types';

const propTypes = {
  connectionState: PropTypes.string.isRequired
}

const getConnectionStateColor = (connectionState, theme) => {
  console.log(connectionState, theme)
  switch (connectionState) {
    case 'connecting':
      return theme.connecting_color
    case 'connected':
      return theme.connected_color
    case 'disconnected':
      return theme.disconnected_color
    default:
      return
  }
}

const Container = styled.div`
  grid-column: connection-status;
  margin-left: 25px;
  margin-right: 25px;
`;

const ContentWrapper = styled.div`
  float: right;
  display: grid;
  grid-template-columns: [status-indicator] 20px [status-text] 1fr;
`;

const Indicator = styled.div`
  grid-column: status-indicator;

  height: 12px;
  width: 12px;
  margin: 10px;
  border-radius: 50%;

  float: right;
  text-align: left;

  background-color: ${props => getConnectionStateColor(props.connectionState, props.theme)}
`;

const StyledText = styled(Text)`
  grid-column: status-text;
  position: relative;
  text-align: left;

  color: ${props => getConnectionStateColor(props.connectionState, props.theme)}
`;

class ConnectionStatus extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    return (
      <Container>
        <ContentWrapper>
          <Indicator connectionState={this.props.connectionState} />
          <StyledText connectionState={this.props.connectionState}>{this.props.connectionState}</StyledText>
        </ContentWrapper>
      </Container >
    )
  }
}

ConnectionStatus.propTypes = propTypes

export default ConnectionStatus