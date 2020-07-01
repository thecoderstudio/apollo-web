import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Terminal as XTerm } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import chalk from 'chalk';

const propTypes = {
  agent: PropTypes.object.isRequired
};

const Container = styled(Card)`
  height: 100%;
  max-height: 400px;
  width: 700px;
  padding: 20px;
`

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

export class Terminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.terminalRef = React.createRef();
    this.term = new XTerm(TERMINAL_SETTINGS);
    this.chalk = new chalk.Instance(CHALK_SETTINGS);
    this.onSocketError = this.onSocketError.bind(this);
    this.write = this.write.bind(this);
    this.connect = this.connect.bind(this);
    this.connect()
  }

  connect() {
    const agent = this.props.agent
    console.log(`${process.env.APOLLO_WS_URL}agent/${agent.id}/shell`)
    const socket = new WebSocket(
      `${process.env.APOLLO_WS_URL}agent/${agent.id}/shell`
    );
    socket.onerror = this.onSocketError;

    const attachAddon = new AttachAddon(socket);
    this.term.loadAddon(attachAddon);
  }

  componentDidMount() {
    const styledName = this.chalk.hex(this.props.theme.primary).bold(this.props.agent.name)
    this.term.open(this.terminalRef.current);
    this.write(`Connecting to agent ${styledName}...\n\r\n`);
  }

  onSocketError() {
    console.log('called');
    this.write(this.chalk.hex(this.props.theme.error).bold(
      "Something went wrong in the connection with the agent."
    ))
  }

  write(text) {
    this.term.write(text);
  }

  render() {
    return (
      <Container>
        <StyledXTerm ref={this.terminalRef} data-testid="terminal" />
      </Container>
    );
  }
}

Terminal.propTypes = propTypes;

export default withTheme(Terminal);
