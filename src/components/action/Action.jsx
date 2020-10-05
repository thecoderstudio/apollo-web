import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from '../Link';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  agentId: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
}; 

const Container = styled(Link)`
  display: grid;
  grid-template-columns: [image] 50px [content] 1fr;
  grid-template-rows: [title] 1fr [body] 1fr;
  grid-column-gap: 30px;
  align-items: center;
  margin: 16px;
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
  const {title, children, agentId, endpoint, ...rest} = props;
  return (
    <Container {...rest} to={`/agent/${agentId}/action/${endpoint}`}>
      <Image className="material-icons">assessment</Image>
      <Title>{title}</Title>
      <Body>{children}</Body>
    </Container>
  );
}

Action.propTypes = propTypes;

export default Action;
