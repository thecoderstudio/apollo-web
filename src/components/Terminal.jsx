import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled(Card)`
  height: 100%;
  max-height: 400px;
  width: 700px;
`

export default function Terminal(props) {
  return <Container>Terminal</Container>;
}
