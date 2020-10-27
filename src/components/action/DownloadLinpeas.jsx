import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const Container = styled(Card)`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-left: auto;
  margin-right: auto;
  min-height: 450px;
  width: 100%;
  max-width: 400px;
  transform: translateY(-50%);

  box-sizing: border-box;
`;

export default class DownloadLinpeas extends React.PureComponent {
  render() {
    return (
      <Container>
        test
      </Container>
    );
  }
}
