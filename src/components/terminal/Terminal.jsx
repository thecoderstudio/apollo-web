import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Terminal as XTerm } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import chalk from 'chalk';
import { handleError } from '../../actions/error';

const propTypes = {
  agent: PropTypes.object.isRequired,
  agentEndpoint: PropTypes.string,
  readOnly: PropTypes.bool
};

const defaultProps = {
  agentEndpoint: "shell",
  readOnly: false
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

const CHALK_SETTINGS = {
  enabled: true,
  level: 2
};

const socketErrorMessage = "Something went wrong in the connection with the agent.";

export class Terminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.terminalRef = React.createRef();
    this.term = new XTerm(this.getTerminalSettings(props.readOnly));
    this.chalk = new chalk.Instance(CHALK_SETTINGS);
    this.onSocketError = this.onSocketError.bind(this);
    this.onSocketClose = this.onSocketClose.bind(this);
    this.write = this.write.bind(this);
    this.fit = this.fit.bind(this);
    this.connect = this.connect.bind(this);
    this.state = { success: true };
    this.connect();
  }

  getTerminalSettings(readOnly) {
    return {
      theme : {
        background: "#ffffff00"
      },
      allowTransparency: true,
      disableStdin: !readOnly
    };
  }

  connect() {
    const { agent, agentEndpoint } = this.props;
    this.socket = new WebSocket(
      `${process.env.APOLLO_WS_URL}agent/${agent.id}/${agentEndpoint}`
    );
    this.socket.onerror = this.onSocketError;
    this.socket.onclose = this.onSocketClose;

    const attachAddon = new AttachAddon(this.socket);
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

  componentWillUnmount() {
    this.socket.close();
  }

  onSocketError() {
    this.setState({ success: false });
    handleError(socketErrorMessage, false);
    this.write(this.chalk.hex(this.props.theme.error).bold(socketErrorMessage));
  }

  onSocketClose() {
    this.props.onSocketClose(this.state.success);
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
Terminal.defaultProps = defaultProps;

export function openTerminal(agentId) {
  const location = window.location;
  window.open(`${location.protocol}//${location.host}/agent/${agentId}/shell`);
}

export default withTheme(Terminal);
