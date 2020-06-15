import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { login as loginAction } from '../actions/auth';
import media from '../util/media';
import moonImg from '../images/moon_rocket.svg';

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
  max-width: 400px;
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
          <SupportingImg src={moonImg} />
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
