import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Terminal from './Terminal';

const Window = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-height: 400px;
  width: 700px;
`;

export default class TerminalWindow extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Draggable>
        <Window>
          <Terminal agent={this.props.agent} />
        </Window>
      </Draggable>
    );
  }
}
