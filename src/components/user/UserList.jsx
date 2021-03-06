import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { handleHTTPResponse } from '../../actions/error';
import OutlinedIconButton from '../buttons/OutlinedIconButton';
import UserListItem from './UserListItem';
import CreateUser from './CreateUser';

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
    )
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(error => {
        handleHTTPResponse(error.response);
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
          <h2>Users</h2>
          <OutlinedIconButton onClick={this.createUser} iconClassName="fas fa-plus">
            Create user
          </OutlinedIconButton>
        </Header>
        <List>
          {this.state.users.map(user => {
            return <UserListItem key={user.id} user={user} userDeleteCallback={this.fetchUsers} />;
          })}
        </List>
        { this.state.creatingUser && <CreateUser onClose={this.closeCreateUser} /> }
      </div>
    );
  }
}