import React from 'react';
import styled from 'styled-components';
import Terminal from '../components/Terminal';

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export default function TestPage(props) {
  return (
    <Container>
      <Terminal agentId="" />
    </Container>
  );
}
