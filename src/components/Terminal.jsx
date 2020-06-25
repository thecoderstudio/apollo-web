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
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  onTypeChange(newEditorState) {
    this.setState({editorState: newEditorState});
  }

  render() {
    return (
      <Container>
        <StyledEditor editorState={this.state.editorState} onChange={this.onTypeChange}  />
      </Container>
    );
  }
}

export default Terminal;
