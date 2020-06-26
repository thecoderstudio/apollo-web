import React from 'react';
import styled, { withTheme } from 'styled-components';
import Card from '../components/Card';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';

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

class Terminal extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = new WebSocket('ws://localhost:1970/agent/73d711e0-923d-42a7-9857-5f3d67d88370/shell');
    var term = new XTerm({
      theme : {
        background: "#ffffff00"
      },
      allowTransparency: true
    });
    var fitAddon = new FitAddon();
    const attachAddon = new AttachAddon(socket);
    term.loadAddon(attachAddon);
    term.open(document.getElementById('terminal'));
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  }

  render() {
    return (
      <Container>
        <StyledXTerm id="terminal" />
      </Container>
    );
  }
}

export default withTheme(Terminal);
