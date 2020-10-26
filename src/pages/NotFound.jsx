import React from 'react';
import styled from 'styled-components';
import media from '../util/media';
import Link from '../components/links/Link';
import OutlinedButton from '../components/buttons/OutlinedButton';
import notFoundImg from '../images/lost.svg';

const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 1750px;
  height: 100%;
  display: grid;
  grid-template-columns: [img] 1fr [content] 1fr;
  justify-items: center;
  align-items: center;

  ${
    media.phone`
      grid-template-columns: [content] 1fr;
    `
  }
`;

const SupportingImg = styled.img`
  grid-column: img;
  width: 75%;

  ${
    media.phone`
      display: none;
    `
  }
`;

const Content = styled.div`
  display: flex;
  grid-column: content;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0px;
  text-align: center;
  font-size: 20em;
  color: ${props => props.theme.primary};

  ${
    media.phone`
      font-size: 10em;
    `
  }
`;

const SubTitle = styled.h2`
  margin: 0px;
  text-align: center;
  font-size: 2em;
  color: ${props => props.theme.darkGrey};

  ${
    media.phone`
      font-size: 1em;
    `
  }
`;

const StyledButton = styled(OutlinedButton)`
  margin-top: 64px;
  border: 1px solid ${props => props.theme.primary};
`;

export default function NotFound(props) {
  return (
    <Container>
      <SupportingImg src={notFoundImg} />
      <Content>
        <Title>404</Title>
        <SubTitle>Houston, we have a problem</SubTitle>
        <StyledButton><Link to='/'>Reroute</Link></StyledButton>
      </Content>
    </Container>
  );
}
