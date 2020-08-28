import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Formik } from 'formik';
import { handleHTTPResponse } from '../../actions/error';
import { createUserSchema } from '../../validation/user';
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
    this.createUser = this.createUser.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  createUser(credentials, { setErrors }) {
    axios.post(
      `${process.env.APOLLO_HTTP_URL}user`,
      credentials,
      { withCredentials: true }
    ).then(res => {
      this.close(true);
    })
    .catch(error => {
      handleHTTPResponse(error.response, true, true);
      if (error.response.status === 400) {
        setErrors({
          username: error.response.data.username.msg
        });
      }
    });
  }

  close(success=false) {
    this.props.onClose(success);
  }

  render() {
    return (
      <Container>
        <Content>
          <Title>Create new user</Title>
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={createUserSchema}
            onSubmit={this.createUser}>
            {({ values, errors, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Input
                  name="username"
                  type="username"
                  placeholder="Username"
                  value={values.username}
                  error={errors.username}
                  onChange={handleChange} />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  error={errors.password}
                  onChange={handleChange}
                  autocomplete="new-password" />
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={handleChange}
                  autocomplete="new-password" />
                <Buttons>
                  <OutlinedButton onClick={this.close}>Cancel</OutlinedButton>
                  <Button>Create user</Button>
                </Buttons>
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }
}
