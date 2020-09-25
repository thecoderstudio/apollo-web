import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '../Card';
import Terminal from './Terminal';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';
import Icon from '../Icon';

const propTypes = {
  agent: PropTypes.object.isRequired
};

const Container = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const StyledTerminal = styled(Terminal)`
  padding: 0px;
  height: 400px;
`;

const ControlBar = styled.div`
  display: flex;
  margin: 16px 0px 16px 16px;
  height: 24px;
  flex-direction: row-reverse;
`;

const Disconnect = styled(Icon)`
  color: ${props => props.theme.error};
`;

class InlineTerminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderContents = this.renderContents.bind(this);
    this.renderUnopenedTerminalState = this.renderUnopenedTerminalState.bind(this);
    this.openShell = this.openShell.bind(this);
    this.closeShell = this.closeShell.bind(this);
    this.terminalRef = React.createRef();
    this.state = {
      openedShell: props.openedShell
    };
  }

  componentDidUpdate(prevProps) {
    if(this.terminalRef.current) {
      this.terminalRef.current.fit();
    }
  }

  renderContents() {
    const connected = this.props.agent.connectionState === 'connected';
    if (connected && this.state.openedShell) {
      return <StyledTerminal ref={this.terminalRef} agent={this.props.agent} />;
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
          {this.state.openedShell && <Disconnect onClick={this.closeShell} className="material-icons">clear</Disconnect>}
        </ControlBar>
      </div>
    );
  }
}

InlineTerminal.propTypes = propTypes;

export default InlineTerminal;
