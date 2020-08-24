import React from 'react';
import styled from 'styled-components';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';
import Input from '../Input';
import Card from '../Card';

const Container = styled(Card)`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  min-height: 400px;
  width: 100%;
  max-width: 400px;
  display: grid;
  grid-template-rows: [title] 1fr [form ]4fr;
  align-items: center;
`;

const Title = styled.h2`
  grid-row: title;
  text-align: center;
`;

const Form = styled.form`
  height: 95%;
  grid-row: form;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 40px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;

  &> button {
    min-width: 150px;
  }
`;

export default class CreateUser extends React.PureComponent {
  render() {
    return (
      <Container>
        <Title>Create new user</Title>
        <Form>
          <Input type="username" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm password" />
          <Buttons>
          <OutlinedButton>Cancel</OutlinedButton>
          <Button>Create user</Button>
          </Buttons>
        </Form>
      </Container>
    );
  }
}
