import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Formik } from 'formik';
import { StatusCodes } from 'http-status-codes';
import { handleHTTPResponse } from '../../actions/error';
import { createUserSchema } from '../../validation/user';
import { parseHTTPErrors } from '../../util/parser';
import media from '../../util/media';
import Input from '../Input';
import FormModal from '../modals/FormModal';

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
      if (error.response.status === StatusCodes.BAD_REQUEST) {
        setErrors(parseHTTPErrors(error.response.data));
      }
    });
  }

  close(success=false) {
    this.props.onClose(success);
  }

  render() {
    return (
      <FormModal
        title="Create new user"
        primaryActionTitle="Create user"
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        validationSchema={createUserSchema}
        onClose={this.close}
        onSubmit={this.createUser}>
        {(values, errors, handleChange) => (
          <div>
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
          </div>
        )}
      </FormModal>
    );
  }
}
