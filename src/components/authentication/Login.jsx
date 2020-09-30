import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '../buttons/Button';
import { StatusCodes } from 'http-status-codes';
import Input from '../Input';
import loginSchema from '../../validation/login';
import { login as loginAction } from '../../actions/auth';
import { parseHTTPErrors } from '../../util/parser';
import { handleHTTPResponse } from '../../actions/error';
import { fetchCurrentUser } from '../../util/user';

const Form = styled.form`
  height: 75%;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 40px;
`;

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
  }

  login(credentials, { setErrors }) {
    console.log("login")
    axios.post(
      `${process.env.APOLLO_HTTP_URL}auth/login`,
      credentials,
      { withCredentials: true }
    )
      .then(_ => {
        console.log("SUCCES")
        fetchCurrentUser(this.loginSuccessCallback);
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data, { detail: 'password' }));
        }
      });
  }

  loginSuccessCallback() {
    this.props.dispatch(loginAction());
  }

  render() {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        validateOnChange={false}
        onSubmit={this.login}>
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
              onChange={handleChange} />
            <Button>Log in</Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default connect()(Login);

export { Login as UnconnectedLogin };
