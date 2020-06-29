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

class Terminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.term = new XTerm(TERMINAL_SETTINGS);
    this.chalk = new chalk.Instance(CHALK_SETTINGS);
    this.onSocketError = this.onSocketError.bind(this);
    this.connect = this.connect.bind(this);
    this.connect()
  }

  connect() {
    const agent = this.props.agent
    const socket = new WebSocket(
      `${process.env.APOLLO_WS_URL}agent/${agent.id}/shell`
    );
    socket.onerror = this.onSocketError;

    const attachAddon = new AttachAddon(socket);
    this.term.loadAddon(attachAddon);
  }

  componentDidMount() {
    const styledName = this.chalk.hex(this.props.theme.primary).bold(this.props.agent.name)
    this.term.open(document.getElementById('terminal'));
    this.term.write(`Connecting to agent ${styledName}...\n\r\n`);
  }

  onSocketError() {
    this.term.write(this.chalk.hex(this.props.theme.error).bold(
      "Something went wrong in the connection with the agent."
    ))
  }

  render() {
    return (
      <Container>
        <StyledXTerm id="terminal" />
      </Container>
    );
  }
}

Terminal.propTypes = propTypes;

export default withTheme(Terminal);
