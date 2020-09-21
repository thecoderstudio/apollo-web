import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '../Card';
import Terminal from './Terminal';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';

const propTypes = {
  agent: PropTypes.object.isRequired
};

const Container = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;

const ControlBar = styled.div`
  display: flex;
  margin: 16px 0px;
  flex-direction: row-reverse;
`;

class InlineTerminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderContents = this.renderContents.bind(this);
    this.renderUnopenedTerminalState = this.renderUnopenedTerminalState.bind(this);
    this.openShell = this.openShell.bind(this);
    this.closeShell = this.closeShell.bind(this);
    this.state = {
      openedShell: props.openedShell
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.openedShell !== this.props.openedShell) {
      this.setState({
        openedShell: this.props.openedShell
      });
    }
  }

  renderContents() {
    const connected = this.props.agent.connectionState == 'connected';
    if (connected && this.state.openedShell) {
      return <Terminal agent={this.props.agent} />;
    } else {
      return this.renderUnopenedTerminalState(connected);
    }
  }

  openShell() {
    this.setState({openedShell: true});
  }

  closeShell() {
    this.setState({openedShell: false});
  }

  renderUnopenedTerminalState(connected) {
    const connectionState = this.props.agent.connectionState;
    return (
      <div>
        <h2>{connectionState}</h2>
        {connected && <OutlinedButton onClick={this.openShell}>Open shell</OutlinedButton>}
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        <Container>
          {this.renderContents()}
        </Container>
        <ControlBar>
          <OutlinedButton onClick={this.closeShell}>Close shell</OutlinedButton>
        </ControlBar>
      </div>
    );
  }
}

InlineTerminal.propTypes = propTypes;

export default InlineTerminal;
