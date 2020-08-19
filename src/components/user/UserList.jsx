import React from 'react';
import axios from 'axios';
import UserListItem from './UserListItem';


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
      <div>
        {this.state.users.map(user => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}
