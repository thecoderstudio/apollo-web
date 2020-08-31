import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Terminal as XTerm } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import chalk from 'chalk';
import { handleError } from '../../actions/error';

const propTypes = {
  agent: PropTypes.object.isRequired
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
`;

const StyledXTerm = styled.div`
  height: 100%;
  width: 100%;

  .xterm-viewport {
    overflow: hidden !important;
  }
`;

const TERMINAL_SETTINGS = {
  theme : {
    background: "#ffffff00"
  },
  allowTransparency: true
};

const CHALK_SETTINGS = {
  enabled: true,
  level: 2
};

const socketErrorMessage = "Something went wrong in the connection with the agent.";

export class Terminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.terminalRef = React.createRef();
    this.term = new XTerm(TERMINAL_SETTINGS);
    this.chalk = new chalk.Instance(CHALK_SETTINGS);
    this.onSocketError = this.onSocketError.bind(this);
    this.onSocketClose = this.onSocketClose.bind(this);
    this.write = this.write.bind(this);
    this.fit = this.fit.bind(this);
    this.connect = this.connect.bind(this);
    this.connect();
  }

  connect() {
    const agent = this.props.agent;
    const socket = new WebSocket(
      `${process.env.APOLLO_WS_URL}agent/${agent.id}/shell`
    );
    socket.onerror = this.onSocketError;
    socket.onclose = this.onSocketClose;

    const attachAddon = new AttachAddon(socket);
    this.fitAddon = new FitAddon();
    this.term.loadAddon(attachAddon);
    this.term.loadAddon(this.fitAddon);
  }

  componentDidMount() {
    const styledName = this.chalk.hex(this.props.theme.primary).bold(this.props.agent.name);
    this.term.open(this.terminalRef.current);
    this.fit();
    this.write(`Connecting to agent ${styledName}...\n\r\n`);
  }

  onSocketError() {
    handleError(socketErrorMessage, false);
    this.write(this.chalk.hex(this.props.theme.error).bold(socketErrorMessage));
  }

  onSocketClose() {
    this.write(this.chalk.hex(this.props.theme.error).bold(
      "\n\r\nConnection with server is closed"
    ));
  }

  write(text) {
    this.term.write(text);
  }

  fit() {
    try {
      this.fitAddon.fit();
    } catch (e) {
      // Ignore if required DOM parent is unavailable
      if ("This API only accepts integers" === e.message) {
        return;
      }

      throw e;
    }
  }

  render() {
    return (
      <Container className={this.props.className}>
        <StyledXTerm ref={this.terminalRef} data-testid="terminal" />
      </Container>
    );
  }
}

Terminal.propTypes = propTypes;

export function openTerminal(agentId) {
  const location = window.location;
  window.open(`${location.protocol}//${location.host}/agent/${agentId}/shell`);
}

export default withTheme(Terminal);
