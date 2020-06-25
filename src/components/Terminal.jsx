import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { Editor, EditorState } from 'draft-js';

const Container = styled(Card)`
  height: 100%;
  max-height: 400px;
  width: 700px;
`

const StyledEditor = styled(Editor)`
  height: 100%;
  width: 100%;
`;

class Terminal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onEditorChange = this.onEditorChange.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.client = new WebSocket('ws://localhost:1970/agent/73d711e0-923d-42a7-9857-5f3d67d88370/shell');
  }

  componentWillMount() {
    this.client.onmessage = function incoming(data) {
      console.log(data.data);
    }
  }

  onEditorChange(newEditorState) {
    this.sendCommand(newEditorState.getCurrentContent().getPlainText());
    this.setState({editorState: newEditorState});
  }

  sendCommand(command) {
    this.client.send(command);
  }

  render() {
    return (
      <Container>
        <StyledEditor editorState={this.state.editorState} onChange={this.onEditorChange}  />
      </Container>
    );
  }
}

export default Terminal;
