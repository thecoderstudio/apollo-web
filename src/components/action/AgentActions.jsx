import React from 'react';
import styled from 'styled-components';
import Action from './Action';
import media from '../../util/media';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const Category = styled.div`
  width: 100%;

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    ${
      media.phone`
        grid-template-columns: 1fr;
      `
    }
  }
`;

const AgentAction = styled(Action)`
  margin: 16px 16px 16px 0;
`;

class AgentActions extends React.PureComponent {
  render() {
    return (
      <Container className={this.props.className}>
        <Category>
          <h2>Enumeration</h2>
          <div>
            <AgentAction title="Run LinEnum">Local Linux enumeration and privilege escalation script</AgentAction>
            <AgentAction title="Run LinEnum">Local Linux enumeration and privilege escalation script</AgentAction>
            <AgentAction title="Run LinEnum">Local Linux enumeration and privilege escalation script</AgentAction>
            <AgentAction title="Run LinEnum">Local Linux enumeration and privilege escalation script</AgentAction>
            <AgentAction title="Run LinEnum">Local Linux enumeration and privilege escalation script</AgentAction>
          </div>
        </Category>
      </Container>
    );
  }
}


export default AgentActions;
