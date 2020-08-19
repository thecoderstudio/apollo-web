import React from 'react';
import UserListItem from './UserListItem';


export default class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <UserListItem />
        ))}
      </div>
    );
  }
}
