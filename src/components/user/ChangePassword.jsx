import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../buttons/Button';
import Input from '../../components/Input';
import { changePasswordSchema } from '../../validation/user.js'
import { StatusCodes } from 'http-status-codes';
import { handleHTTPResponse } from '../../actions/error';
import { parseHTTPErrors } from '../../util/parser';

const Text = styled.p`
  text-align: center;
	width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

class ChangePassword extends React.PureComponent {
	constructor(props) {
		super(props);	
	}

	changePassword(values, { setErrors }) {
		axios.put(
		  `${process.env.APOLLO_HTTP_URL}/user/${this.props.currentUser.id}`,
      { withCredentials: true }
		)
			.then(res => {
			  // relocate to dashboard
			})
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.reponse.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data))
        }
      })
	}

  render() {
    return (
      <Formik
        initialValues={{ password: '', password_confirm: '' }}
        validationSchema={changePasswordSchema}
        onSubmit={this.changePassword}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <form>
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
              type='password_confirm'
              placeholder='confirm new password'
              value={values.password_confirm}
              error={errors.password_confirm}
              onChange={handleChange}
            />
            <StyledButton disabled>Change Password</StyledButton>
            <Text>Skip changing password</Text>
          </form>
        )}
      </Formik>
    );
  }
}

export default connect( 
	state => ({ currentUser: state.currentUser })
)(ChangePassword);
