import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserListItem from './UserListItem';

const List = styled.div`
  >:nth-child(odd) {
    background-color: ${props => props.theme.black};
  }
`;


export default class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios.get(
      `${process.env.APOLLO_HTTP_URL}user`,
      { withCredentials: true }
    ).then(res => {
      if (res.status === 200) {
        this.setState({
          users: res.data
        });
      }
    });
  }

  render() {
    return (
      <List>
        {this.state.users.map(user => {
          let role;
          if (user.role != null) {
            role = user.role.name;
          }
          return <UserListItem key={user.id} user={user} />
        })}
      </List>
    );
  }
}
