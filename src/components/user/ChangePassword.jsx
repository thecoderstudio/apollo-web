import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';
import Input from '../../components/Input';
import { changePasswordSchema } from '../../validation/user.js'
import { StatusCodes } from 'http-status-codes';
import { handleHTTPResponse } from '../../actions/error';
import { parseHTTPErrors } from '../../util/parser';

const propTypes = {
  oldPassword: PropTypes.string.isRequired,
  onFinishedCallback: PropTypes.func.inRequired
};

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

class ChangePassword extends React.PureComponent {
	constructor(props) {
		super(props);	
    this.getButton = this.getButton.bind(this);
	}

	changePassword(values, { setErrors }) {
		axios.put(
		  `${process.env.APOLLO_HTTP_URL}/user/${this.props.currentUser.id}`,
      { withCredentials: true }
		)
			.then(res => {
        this.props.onFinishedCallback();
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.reponse.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data))
        }
      })
	}
  
  getButton(errors, values) {
    if ((values['password'] === '' && values['password_confirm'] === '') || Object.keys(errors).length !== 0) {
      return <StyledButton disabled>Change password</StyledButton>;
    }
    return <StyledButton>Change password</StyledButton>; 
  }

  render() {
    return (
      <Formik
        initialValues={{ password: '', password_confirm: '', old_password: this.props.oldPassword }}
        validationSchema={changePasswordSchema}
        onSubmit={this.changePassword}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <form>
            <StyledInput
              name='old_password'
              type='password'
              value={values.old_password}
              readOnly
            /> 
            <Input 
              inverted
              name='password'
              type='password'
              placeholder='new password'
              value={values.password}
              error={errors.password}
              onChange={handleChange}
            />
            <Input 
              inverted
              name='password_confirm'
              type='password'
              placeholder='confirm new password'
              value={values.password_confirm}
              error={errors.password_confirm}
              onChange={handleChange}
            />
            { this.getButton(errors, values) }
            <StyledOutlinedButton onClick={this.props.onFinishedCallback}>Skip this step</StyledOutlinedButton>
          </form>
        )}
      </Formik>
    );
  }
}

ChangePassword.propTypes = propTypes;

export default connect( 
	state => ({ currentUser: state.currentUser })
)(ChangePassword);
