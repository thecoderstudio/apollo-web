import React from 'react';
import styled from 'styled-components'
import Text from '../Text'

const Container = styled.div`
  grid-column: connection-status;
  margin-left: 25px;
  margin-right: 25px;
`;

const ContentWrapper = styled.div`
  float: right;
  display: grid;
  grid-template-columns: [status-indicator] 20px [status-text] 1fr;
`;

const Indicator = styled.div`
  grid-column: status-indicator;

  height: 12px;
  width: 12px;
  margin: 10px;
  border-radius: 50%;

  float: right;
  text-align: left;

  background-color: orange;
`;

const StyledText = styled(Text)`
  grid-column: status-text;
  position: relative;
  text-align: left;
`;

export default function ConnnectionStatus(props) {
  return (
    <Container>
      <ContentWrapper>
        <Indicator />
        <StyledText>Connected</StyledText>
      </ContentWrapper>
    </Container>
  )
}