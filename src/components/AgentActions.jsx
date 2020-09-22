import React from 'react';
import styled from 'styled-components';
import Action from './Action';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const Category = styled.div`
  width: 100%;
`;

class AgentActions extends React.PureComponent {
  render() {
    return (
      <Container className={this.props.className}>
        <Title>Start hacking</Title>
        <Category>
          <h2>Enumeration</h2>
          <Action title="Run LinEnum">Local Linux enumeration and privilege escalation script</Action>
        </Category>
      </Container>
    );
  }
}


export default AgentActions;
