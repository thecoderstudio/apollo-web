import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Terminal as XTerm } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';

const testAgent = {
  id: "73d711e0-923d-42a7-9857-5f3d67d88370",
  name: "test"
}

const propTypes = {
  agent: PropTypes.object
};

const defaultProps = {
  agent: testAgent
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
}

class Terminal extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var term = new XTerm(TERMINAL_SETTINGS);
    const agent = this.props.agent
    const socket = new WebSocket(
      `${process.env.APOLLO_WS_URL}agent/${agent.id}/shell`
    );
    socket.onerror = function() {
      term.write(`Something went wrong in the connection with the agent.`)
    }
    const attachAddon = new AttachAddon(socket);
    term.loadAddon(attachAddon);
    term.open(document.getElementById('terminal'));
    term.write(`Connecting to agent ${agent.name}...\n\r`)
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
Terminal.defaultProps = defaultProps;

export default withTheme(Terminal);
