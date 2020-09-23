import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../buttons/Button';
import Input from '../../components/Input';
import { changePasswordSchema } from '../../validation/user.js';
import { fetchCurrentUser } from '../../util/user';
import { StatusCodes } from 'http-status-codes';
import { handleHTTPResponse } from '../../actions/error';
import { parseHTTPErrors } from '../../util/parser';

const Form = styled.form`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
`;

class ChangePassword extends React.PureComponent {
  changePassword = (values, { setErrors }) => {
		axios.patch(
      `${process.env.APOLLO_HTTP_URL}user/me`,
      {
        'old_password': values['oldPassword'],
        'password': values['password'],
        'password_confirm': values['passwordConfirm']
      },
      { withCredentials: true }
		)
			.then(_ => {
        fetchCurrentUser();
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data, {
            old_password: 'oldPassword', password_confirm: 'passwordConfirm'
          }));
        }
      });
	}

  getButtonState = (values) => {
    if (values['password'] === '' || values['passwordConfirm'] === '' ||
        values['passwordConfirm'] === '') {
      return true;
    }
    return false
  }

  render() {
    return (
      <Formik
        initialValues={{ password: '', passwordConfirm: '', oldPassword: ''}}
        validationSchema={changePasswordSchema}
        validateOnChange={false}
        onSubmit={this.changePassword}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              name='oldPassword'
              placeholder='Current password'
              type='password'
              value={values.oldPassword}
              error={errors.oldPassword}
              onChange={handleChange}
            />
            <Input
              name='password'
              type='password'
              placeholder='New password'
              value={values.password}
              error={errors.password}
              onChange={handleChange}
            />
            <Input
              name='passwordConfirm'
              type='password'
              placeholder='Confirm new password'
              value={values.passwordConfirm}
              error={errors.passwordConfirm}
              onChange={handleChange}
            />
            <StyledButton disabled={this.getButtonState(values) }>Change password</StyledButton>
          </Form>
        )}
      </Formik>
    );
  }
}

export default connect(
	state => ({ currentUser: state.currentUser })
)(ChangePassword);
