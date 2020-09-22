import React from 'react';
import styled from 'styled-components';
import Action from './Action';

const Container = styled.div`

`;

const Title = styled.h1`
  text-align: center;
`;

const Category = styled.div`

`;

const Subtitle = styled.h4`
`;

class AgentActions extends React.PureComponent {
  render() {
    return (
      <Container className={this.props.className}>
        <Title>Start hacking</Title>
        <Category>
          <Subtitle>Enumeration</Subtitle>
          <Action title="Run LinEnum">Local Linux enumeration and privilege escalation script</Action>
        </Category>
      </Container>
    );
  }
}


export default AgentActions;
