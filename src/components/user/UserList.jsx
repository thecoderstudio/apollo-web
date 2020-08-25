import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import OutlinedButton from '../buttons/OutlinedButton';
import UserListItem from './UserListItem';
import CreateUser from './CreateUser';

const Title = styled.h2`
`;

const Header = styled.div`
  margin: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    this.createUser = this.createUser.bind(this);
    this.closeCreateUser = this.closeCreateUser.bind(this);
    this.state = {
      users: [],
      creatingUser: false
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

  createUser() {
    this.setState({
      creatingUser: true
    });
  }

  closeCreateUser(success) {
    if (success) {
      this.fetchUsers();
    }
    this.setState({
      creatingUser: false
    });
  }

  render() {
    return (
      <div>
        <Header>
          <Title>Users</Title>
          <OutlinedButton onClick={this.createUser}>
            <i className="fas fa-plus" /> Create User
          </OutlinedButton>
        </Header>
        <List>
          {this.state.users.map(user => {
            return <UserListItem key={user.id} user={user} />;
          })}
        </List>
        { this.state.creatingUser && <CreateUser onClose={this.closeCreateUser} /> }
      </div>
    );
  }
}
