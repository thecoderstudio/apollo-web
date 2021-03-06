import React from 'react';
import styled from 'styled-components';
import Action from './Action';
import media from '../../util/media';

const Container = styled.div`
  width: 100%;
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
            <AgentAction
              agentId={this.props.agent.id}
              disabled={this.props.agent.connectionState !== 'connected'}
              endpoint="linpeas"
              title="Run LinPEAS">
              LinPEAS is a script that search for possible paths to escalate privileges on Linux/Unix hosts
            </AgentAction>
          </div>
        </Category>
      </Container>
    );
  }
}


export default AgentActions;
