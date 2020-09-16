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
  constructor(props) {
    super(props);
    this.getButton = this.getButton.bind(this);
    this.changePassword = this.changePassword.bind(this);
	}

  changePassword(values, { setErrors }) {
		axios.patch(
      `${process.env.APOLLO_HTTP_URL}user/me`,
      {
        'old_password': values['oldPassword'],
        'password': values['password'],
        'password_confirm': values['passwordConfirm']
      },
      { withCredentials: true }
		)
			.then(res => {
        fetchCurrentUser(this.props.dispatch);
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data, { detail: 'oldPassword' }));
        }
      });
	}

  getButton(errors, values) {
    if ((values['password'] === '' && values['passwordConfirm'] === '') || Object.keys(errors).length !== 0) {
      return <StyledButton disabled>Change password</StyledButton>;
    }
    return <StyledButton type="submit">Change password</StyledButton>;
  }

  render() {
    return (
      <Formik
        initialValues={{ password: '', passwordConfirm: '', oldPassword: ''}}
        validationSchema={changePasswordSchema}
        onSubmit={this.changePassword}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              inverted
              name='oldPassword'
              placeholder='Current password'
              type='password'
              value={values.oldPssword}
              error={errors.oldPassword}
              onChange={handleChange}
            />
            <Input
              inverted
              name='password'
              type='password'
              placeholder='New password'
              value={values.password}
              error={errors.password}
              onChange={handleChange}
            />
            <Input
              inverted
              name='passwordConfirm'
              type='password'
              placeholder='Confirm new password'
              value={values.passwordConfirm}
              error={errors.passwordConfirm}
              onChange={handleChange}
            />
            { this.getButton(errors, values) }
          </Form>
        )}
      </Formik>
    );
  }
}

export default connect(
	state => ({ currentUser: state.currentUser })
)(ChangePassword);
