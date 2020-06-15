import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { login as loginAction } from '../actions/auth';
import media from '../util/media';

const OuterContainer = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: grid;
  justify-items: center;
  height: 90%;
  max-height: 950px;
  margin: 100px;
  grid-template-rows: [heading] 1fr [title] 1fr [content] 4fr;

  ${
    media.phone`
      margin: 20px;
    `
  }
`;

const Title = styled.h1`
  grid-row: title;
  color: ${props => props.theme.primary};
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  height: 350px;
  grid-row: content;
  display: grid;
  align-items: center;

  ${
    media.phone`
      box-shadow: none;
      background-color: ${props => props.theme.backgroundColorDark};
    `
  }
`;

const Form = styled.form`
  height: 75%;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 40px;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
    this.state = { username: '', password: '' };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  login(e) {
    e.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post(
      process.env.APOLLO_URL.concat("auth/login"),
      credentials,
      { withCredentials: true }
    )
      .then(res => {
        switch (res.status) {
          case 200:
            this.props.dispatch(loginAction());
          default:
            return;
        };
      })
      .catch(error => {
        console.log(error)
      });
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
          <Title>Log in to Apollo</Title>
          <StyledCard>
            <Form onSubmit={this.login}>
              <Input type="username" placeholder="Username" onChange={this.handleUsernameChange} />
              <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
              <Button>Log in</Button>
            </Form>
          </StyledCard>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default connect(({ auth }) => ({ authenticated: auth.authenticated }))(Login);
