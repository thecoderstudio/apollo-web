import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Card from '../components/Card';
import media from '../util/media';
import moonImg from '../images/moon_rocket.svg';
import ChangePassword from '../components/user/ChangePassword';
import Login from '../components/authentication/Login';

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

class Welcome extends React.Component {
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
            {!this.props.authenticated ? "Log in to Apollo" : "Change your password"}
           </Title>
          <StyledCard>
            { !this.props.authenticated ? <Login /> : <ChangePassword /> }
          </StyledCard>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default connect(
  state => ({ authenticated: state.authenticated })
)(Welcome);
