import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserListItem from './UserListItem';

const Title = styled.h2`
  margin: 16px;
`;

const List = styled.div`
margin-top: 16px;

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
    };
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
    console.log(this.props);
    return (
      <div>
        <Title>Users</Title>
        <List>
          {this.state.users.map(user => {
            return <UserListItem key={user.id} user={user} userDeleteCallback={this.fetchUsers} />;
          })}
        </List>
      </div>
    );
  }
}
