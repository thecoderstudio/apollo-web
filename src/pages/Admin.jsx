import React from 'react';
import styled from 'styled-components';
import UserList from '../components/user/UserList';
import Card from '../components/Card';

const Container = styled.div`
  padding: 16px;
`;

const StyledCard = styled(Card)`
  padding: 8px 0px 0px;
`;

export default function Admin(props) {
  return (
    <Container>
      <h1>Admin dashboard</h1>
      <StyledCard>
        <UserList />
      </StyledCard>
    </Container>
  );
}
