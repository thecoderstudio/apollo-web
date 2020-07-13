import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Card from '../../components/Card';
import Terminal from './Terminal';

const Window = styled(Card)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 400px;
  width: 700px;
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

export default class TerminalWindow extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Draggable>
        <Window>
          <TaskBar>
            <WindowButton color={'green'} />
            <WindowButton color={'red'} />
          </TaskBar>
          <Terminal agent={this.props.agent} />
        </Window>
      </Draggable>
    );
  }
}
