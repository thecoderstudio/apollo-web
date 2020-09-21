import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Title = styled.h1`
  text-align: center;
`;

const Category = styled.div`

`;

const Subtitle = styled.h3`
`;

class AgentActions extends React.PureComponent {
  render() {
    return (
      <Container className={this.props.className}>
        <Title>Start hacking</Title>
        <Category>
          <Subtitle>Enumeration</Subtitle>
        </Category>
      </Container>
    );
  }
}


export default AgentActions;
