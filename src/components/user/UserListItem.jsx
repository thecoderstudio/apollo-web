import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px 8px;
  margin: 0px;

  >:nth-child(even) {
    background-color: red;
  }
`;

const Username = styled.h4`
  margin: 0px;
`;

export default function UserListItem(props) {
  return (
    <Container>
      <Username>{props.user.username}</Username>
    </Container>
  );
}
