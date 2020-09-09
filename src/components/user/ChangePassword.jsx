import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';
import Input from '../../components/Input';
import { changePasswordSchema } from '../../validation/user.js'
import { StatusCodes } from 'http-status-codes';
import { handleHTTPResponse } from '../../actions/error';
import { parseHTTPErrors } from '../../util/parser';
import Card from '../Card';
import { promptedPasswordChange } from '../../actions/change-password';

const StyledOutlinedButton = styled(OutlinedButton)`
  margin-top: 15px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  display: none;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 350px;
`;

const Title = styled.h3`
  width: 100%;
  text-align: center;
`;

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getButton = this.getButton.bind(this);
    this.changePassword = this.changePassword.bind(this);
	}

  changePassword(values, { setErrors }) {
    const currentUser = this.props.currentUser;
		axios.put(
		  `${process.env.APOLLO_HTTP_URL}user/${this.props.currentUser.id}`,
      {
        'old_password': values['oldPassword'],
        'password': values['password'],
        'password_confirm': values['passwordConfirm']
      },
      { withCredentials: true }
		)
			.then(res => {
        this.props.dispatch(promptedPasswordChange());
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data));
        }
      })
	}

  getButton(errors, values) {
    if ((values['password'] === '' && values['passwordConfirm'] === '') || Object.keys(errors).length !== 0) {
      return <StyledButton disabled>Change password</StyledButton>;
    }
    return <StyledButton type="submit">Change password</StyledButton>;
  }

  render() {
    return (
      <StyledCard className={this.props.className}>
        <Title>Change password</Title>
        <Formik
          initialValues={{ password: '', passwordConfirm: '', oldPassword: ''}}
          validationSchema={changePasswordSchema}
          onSubmit={this.changePassword}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
              <StyledOutlinedButton onClick={() => this.props.dispatch(promptedPasswordChange())}>Don't change password</StyledOutlinedButton>
            </form>
          )}
        </Formik>
      </StyledCard>
    );
  }
}

export default connect(
	state => ({ currentUser: state.currentUser })
)(ChangePassword);
