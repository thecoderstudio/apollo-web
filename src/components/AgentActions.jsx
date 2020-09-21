import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Title = styled.h1`
  text-align: center;
`;

class AgentActions extends React.PureComponent {
  render() {
    return (
      <Container className={this.props.className}>
        <Title>Start hacking</Title>
      </Container>
    );
  }
}


export default AgentActions;
