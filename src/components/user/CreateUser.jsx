import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { handleHTTPResponse } from '../../actions/error';
import media from '../../util/media';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';
import Input from '../Input';
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

  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing:border-box;

  ${
    media.phone`
      padding: 16px;
      height: 100%;
    `
  }
`;

const Content = styled.div`
  height: 100%;
  max-height: 450px;
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

  ${
    media.phone`
      justify-content: space-between;
      flex-direction: column-reverse;
    `
  }
`;

export default class CreateUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.createUser = this.createUser.bind(this);
    this.validateCredentials = this.validateCredentials.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  changeUsername(e) {
    this.setState({ username: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  changeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  createUser(e) {
    e.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    if (!this.validateCredentials(credentials.username, credentials.password)) {
      return;
    }

    axios.post(
      `${process.env.APOLLO_HTTP_URL}user`,
      credentials,
      { withCredentials: true }
    ).then(res => {
      if (handleHTTPResponse(res, true, true)) {
        this.close(true);
      }
    });
  }

  validateCredentials(username, password) {
    if (username.length < 1 || password > 36) {
      return false;
    }

    return this.validatePassword(password);
  }

  validatePassword(password) {
    if (password.length < 8 || password !== this.state.confirmPassword) {
      return false;
    }

    return true;
  }

  close(success=false) {
    this.props.onClose(success);
  }

  render() {
    return (
      <Container>
        <Content>
          <Title>Create new user</Title>
          <Form onSubmit={this.createUser}>
            <Input type="username" placeholder="Username" onChange={this.changeUsername} required />
            <Input type="password" placeholder="Password" onChange={this.changePassword} autocomplete="new-password" required />
            <Input type="password" placeholder="Confirm password" onChange={this.changeConfirmPassword} autocomplete="new-password" required />
            <Buttons>
              <OutlinedButton onClick={this.close}>Cancel</OutlinedButton>
              <Button>Create user</Button>
            </Buttons>
          </Form>
        </Content>
      </Container>
    );
  }
}
