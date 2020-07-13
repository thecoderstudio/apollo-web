import React from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import Card from '../../components/Card';
import Terminal from './Terminal';

const Window = styled(Card)`
  padding: 0px;
`;

const TaskBar = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: flex-end;
`;

const WindowButton = styled.div`
  height: 12px;
  width: 12px;
  margin-right: 15px;
  background-color: ${props => props.color}; 
  border-radius: 50%;
`;

const Title = styled.h4`
  width: 100%;
  text-align: center;
`;

export default class TerminalWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openTerminalInNewWindow = this.openTerminalInNewWindow.bind(this);
    this.close = this.close.bind(this);
    this.terminal = React.createRef();
  }

  close() {
    this.props.onClose();
  }

  openTerminalInNewWindow() {
    const location = window.location;
    window.open(`${location.protocol}//${location.host}/agent/${this.props.agent.id}/shell`)
  }


  render() {
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
          this.terminal.current.fit();
        }}
      >
        <Window>
          <TaskBar>
            <Title>{this.props.agent.name}</Title>
            <WindowButton onClick={this.openTerminalInNewWindow} color={'green'} />
            <WindowButton onClick={this.close} color={'red'} />
          </TaskBar>
          <Terminal agent={this.props.agent} ref={this.terminal} />
        </Window>
      </Rnd>
    );
  }
}
