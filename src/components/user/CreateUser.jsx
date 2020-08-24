import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const Container = styled(Card)`
  position: absolute;
`;

export default class CreateUser extends React.PureComponent {
  render() {
    return (
      <Container></Container>
    );
  }
}
