import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';
import Input from '../../components/Input';
import { changePasswordSchema } from '../../validation/user.js'
import { StatusCodes } from 'http-status-codes';
import { handleHTTPResponse } from '../../actions/error';
import { parseHTTPErrors } from '../../util/parser';
import { cacheCurrentUser } from '../../actions/current-user.js';
import Card from '../Card';
import { remindPasswordChange } from '../../actions/change-password.js'

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
		axios.put(
		  `${process.env.APOLLO_HTTP_URL}user/${this.props.currentUser.id}`,
      values,
      { withCredentials: true }
		)
			.then(res => {
        const currentUser = this.props.currentUser;
        this.currentUser.changedInitialPassword = true;
        this.props.dispatch(cacheCurrentUser(currentUser));
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        console.log(error.response)
        if (error.reponse.status === StatusCodes.BAD_REQUEST) {
          console.log(error.response.data)
          setErrors(parseHTTPErrors(error.response.data))
        }
      })
	}
  
  getButton(errors, values) {
    if ((values['password'] === '' && values['password_confirm'] === '') || Object.keys(errors).length !== 0) {
      return <StyledButton disabled>Change password</StyledButton>;
    }
    return <StyledButton type="submit">Change password</StyledButton>; 
  }

  render() {
    return (
      <StyledCard className={this.props.className}> 
        <Title>Change password</Title>
        <Formik
          initialValues={{ password: '', password_confirm: '', old_password: ''}}
          validationSchema={changePasswordSchema}
          onSubmit={this.changePassword}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input
                inverted
                name='old_password'
                placeholder='current password'
                type='password'
                value={values.old_password}
                error={errors.old_password}
                onChange={handleChange} 
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
              <StyledOutlinedButton onClick={this.props.onFinishedCallback}>Remind me later</StyledOutlinedButton>
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
