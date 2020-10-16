import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Formik } from 'formik';
import { StatusCodes } from 'http-status-codes';
import Button from "../../components/buttons/Button";
import { UpdateUserSchema } from '../../validation/user';
import Input from '../../components/Input';
import { fetchCurrentUser } from '../../util/user';
import { handleHTTPResponse } from '../../actions/error';
import { parseHTTPErrors } from '../../util/parser';
import { severity, notify as notifyAction } from '../../actions/notification';

const Form = styled.form`
  width: 100%;
  max-width: 300px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

class UserSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.updateUserSuccessCallback = this.updateUserSuccessCallback.bind(this);
  }

  createDictionaryWithoutEmptyFields(values) {
    const data = new Object();
    values.username !== '' && (data.username = values.username);
    if (values.password !== '') {
      data.password = values.password;
      data.password_confirm = values.passwordConfirm;
      data.old_password = values.password;
    }
    return data;
  }

  updateUserSuccessCallback(resetForm) {
    const { dispatch } = this.props;

    dispatch(notifyAction("User data updated", severity.SUCCESS));
    resetForm();
    fetchCurrentUser();
  }

  updateUser(values, setErrors, resetForm) {
    axios.patch(
      `${process.env.APOLLO_HTTP_URL}user/me`,
      this.createDictionaryWithoutEmptyFields(values),
      {
        withCredentials: true
      }
    )
      .then(response => {
        this.updateUserSuccessCallback(resetForm);
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data, {
            old_password: 'oldPassword',
            password_confirm: 'passwordConfirm',
            username: 'username',
            password: 'password'
          }));
        }
      });
  }

  checkForNonEmptyField(values) {
    return !Object.values(values).some(value => value !== '');
  }

  render() {
    const { className } = this.props;

    return (
      <Formik
        className={className}
        initialValues={{
          username: '',
          password: '',
          passwordConfirm: '',
          oldPassword: ''
        }}
        validationSchema={UpdateUserSchema}
        validateOnChange={false}
        onSubmit={(values, { setErrors, resetForm }) => {
          this.updateUser(values, setErrors, resetForm);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h3>Update your user settings</h3>
            <StyledInput
              inverted
              name='username'
              placeholder='Username'
              type='username'
              value={values.username}
              error={errors.username}
              onChange={handleChange}
            />
            <StyledInput
              inverted
              name='oldPassword'
              placeholder='Current password'
              type='password'
              value={values.oldPassword}
              error={errors.oldPassword}
              onChange={handleChange}
            />
            <StyledInput
              inverted
              name='password'
              type='password'
              placeholder='New password'
              value={values.password}
              error={errors.password}
              onChange={handleChange}
            />
            <StyledInput
              inverted
              name='passwordConfirm'
              type='password'
              placeholder='Confirm new password'
              value={values.passwordConfirm}
              error={errors.passwordConfirm}
              onChange={handleChange}
            />
            <StyledButton id='updateUserDetailsButton' disabled={this.checkForNonEmptyField(values)}>Update user details</StyledButton>
          </Form>
        )}
      </Formik>
    );
  }
}

export default connect()(UserSettings, 'User settings');

export { UserSettings as UnconnectedUserSettings };
