import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.object.isRequired
};

const Container = styled.div`
  min-height: 60px;
  padding: 0px 16px;
  margin: 0px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
`;

const Username = styled.p`
  margin: 0px;
`;

const Tag = styled.p`
  float: right;
  width: 80px;
  padding: 4px;
  font-weight: bold;
  text-align: center;
  border-radius: 6px;
  background-color: ${props => props.theme.accent};
`;

function UserListItem(props) {
  let role;
  if (props.user.role !== null) {
    role = <Tag>{props.user.role.name}</Tag>;
  }

  return (
    <Container>
      <Username>{props.user.username}</Username>
      {role}
    </Container>
  );
}

UserListItem.propTypes = propTypes;

export default UserListItem;
