import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Rnd } from 'react-rnd';
import Card from '../../components/Card';
import Terminal, { openTerminal } from './Terminal';

const Window = styled(Card)`
  padding: 0px;
  border: ${props => `1px solid ${props.statusColor}`};
  border-style: none none solid none;
`;

const TaskBar = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
`;

const Controls = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const WindowButton = styled.div`
  height: 12px;
  width: 12px;
  margin-right: 15px;
  background-color: ${props => props.color}; 
  border-radius: 50%;
  cursor: pointer;
`;

const Space = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  flex: 1;
  width: 100%;
  text-align: center;
`;

class TerminalWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openTerminalInNewWindow = this.openTerminalInNewWindow.bind(this);
    this.close = this.close.bind(this);
    this.terminalRef = React.createRef();
  }

  componentDidMount() {
    this.terminalRef.current.fit();
  }

  close() {
    this.props.onClose();
  }

  openTerminalInNewWindow() {
    openTerminal(this.props.agent.id);
  }

  render() {
    let statusColor = this.props.theme.red;
    if (this.props.agent.connection_state == 'connected') {
      statusColor = this.props.theme.green;
    }

    return (
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 700,
          height: 400
        }}
        minWidth={700}
        minHeight={300}
        bounds="window"
        onResize={(e, direction, ref, delta, position) => {
          this.terminalRef.current.fit();
        }}
      >
        <Window statusColor={statusColor}>
          <TaskBar>
            <Space />
            <Title>{this.props.agent.name}</Title>
            <Controls>
              <WindowButton id="expand-button" onClick={this.openTerminalInNewWindow} color={this.props.theme.green} />
              <WindowButton id="close-button" onClick={this.close} color={this.props.theme.red} />
            </Controls>
          </TaskBar>
          <Terminal agent={this.props.agent} ref={this.terminalRef} />
        </Window>
      </Rnd>
    );
  }
}

export default withTheme(TerminalWindow);
