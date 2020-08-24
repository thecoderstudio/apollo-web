import React from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import OutlinedButton from '../components/buttons/OutlinedButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0px;
  text-align: center;
  font-size: 20em;
  color: ${props => props.theme.primary};
`;

const SubTitle = styled.h2`
  margin: 0px;
  text-align: center;
  font-size: 2em;
  color: ${props => props.theme.darkGrey};
`;

const StyledButton = styled(OutlinedButton)`
  margin-top: 64px;
  border: 1px solid ${props => props.theme.primary};
`;

export default function NotFound(props) {
  return (
    <Container>
      <Title>404</Title>
      <SubTitle>Page not found</SubTitle>
      <StyledButton><Link to='/'>Go home</Link></StyledButton>
    </Container>
  );
}
