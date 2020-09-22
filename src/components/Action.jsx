import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: [image] 50px [content] 1fr;
  grid-template-rows: [title] 1fr [body] 1fr;
  grid-column-gap: 40px;
  align-items: center;
`;

const Image = styled.i`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-column: image;
  grid-row: 1 / 3;
  height: 50px;
  width: 100%;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 5px;
`;

const Title = styled.h4`
  grid-column: content;
  grid-row: title;
  color: ${props => props.theme.primary};
  margin: 0 0 8px 0;
`;

const Body = styled.p`
  grid-column: content;
  grid-row: body;
  margin: 0;
`;

function Action(props) {
  return (
    <Container>
      <Image className="material-icons">assessment</Image>
      <Title>{props.title}</Title>
      <Body>{props.children}</Body>
    </Container>
  );
}

export default Action;
