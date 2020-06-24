import React from 'react';
import styled from 'styled-components'
import Text from '../Text'

const Container = styled.div`
  display: grid;
  grid-column: connection-status;
  grid-template-columns: [status-indicator] 20px [status-text] 20px;
`;

const Indicator = styled.div`
  grid-column: status-indicator;

  height: 25px;
  width: 25px

  border-radius: 8px;
  background-color: black;
`;

const StyledText = styled(Text)`
  grid-column: status-text;
`;

export default function ConnnectionStatus(props) {
  return (
    <Container>
      <Indicator />
      <StyledText>Connected</StyledText>
    </Container>
  )
}