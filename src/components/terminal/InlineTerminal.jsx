import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import Terminal from './Terminal';
import OutlinedButton from '../buttons/OutlinedButton';

const Container = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class InlineTerminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderContents = this.renderContents.bind(this);
    this.renderUnopenedTerminalState = this.renderUnopenedTerminalState.bind(this);
    this.openShell = this.openShell.bind(this);
    this.state = {
      openedShell: false
    }
  }

  renderContents() {
    const connected = this.props.agent.connectionState == 'connected';
    if (connected && this.state.openedShell) {
      return <Terminal agent={this.props.agent} />
    } else {
      return this.renderUnopenedTerminalState(connected);
    }
  }

  openShell() {
    this.setState({openedShell: true});
  }

  renderUnopenedTerminalState(connected) {
    const connectionState = this.props.agent.connectionState
    return (
      <div>
        <h2>{connectionState}</h2>
        {connected && <OutlinedButton onClick={this.openShell}>Open shell</OutlinedButton>}
      </div>
    );
  }

  render() {
    return (
      <Container className={this.props.className}>
        {this.renderContents()}
      </Container>
    );
  }
}

export default InlineTerminal;
