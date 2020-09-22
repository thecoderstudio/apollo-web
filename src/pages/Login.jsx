import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import { StatusCodes } from 'http-status-codes';
import Button from '../components/buttons/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { parseHTTPErrors } from '../util/parser';
import { login as loginAction } from '../actions/auth';
import { handleHTTPResponse } from '../actions/error';
import { fetchCurrentUser } from '../util/user';
import loginSchema from '../validation/login';
import media from '../util/media';
import moonImg from '../images/moon_rocket.svg';
import ChangePassword from '../components/user/ChangePassword';

const OuterContainer = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: grid;
  justify-items: center;
  column-gap: 50px;
  height: 90%;
  max-height: 650px;
  margin: 100px;
  grid-template-rows: [heading] 1fr [title] 1fr [content] 4fr;
  grid-template-columns: [img] 1fr [content] 1fr;

  ${
    media.phone`
      grid-template-columns: [content] 1fr;
      grid-template-rows: [title] 1fr [content] 4fr [footer] 1fr;
      margin: 20px 20px 0px 20px;
    `
  }
`;

const Title = styled.h1`
  grid-row: title;
  grid-column: content;
  color: ${props => props.theme.primary};
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  height: 350px;
  grid-row: content;
  grid-column: content;
  display: grid;
  align-items: center;

  ${
    media.phone`
      box-shadow: none;
      background-color: ${props => props.theme.black};
    `
  }
`;

const Form = styled.form`
  height: 75%;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 40px;
`;

const SupportingImg = styled.img`
  grid-column: img;
  grid-row: 2 / 4;
  width: 75%;
  max-width: 800px;
  align-self: center;

  ${
    media.phone`
      grid-column: 1;
      grid-row: footer;
      width: 100%;
    `
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
  }

  login(credentials, { setErrors }) {
    axios.post(
      `${process.env.APOLLO_HTTP_URL}auth/login`,
      credentials,
      { withCredentials: true }
    )
      .then(res => {
        fetchCurrentUser(this.props.dispatch, this.loginSuccessCallback);
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.authenticated) {
      window.location.pathname = "/";
    }
  }

  render() {
    return (
      <OuterContainer>
        <InnerContainer>
          <SupportingImg src={moonImg} />
          <Title>
            {!this.props.authenticated ? <div>Log in to Apollo</div> : <div>Change your password</div>}
           </Title>
          <StyledCard>
            { !this.props.authenticated ?
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
              : <ChangePassword />
            }
          </StyledCard>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default connect(
  state => ({ authenticated: state.authenticated })
)(Login);
