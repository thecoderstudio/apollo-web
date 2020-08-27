import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { handleHTTPResponse } from '../../actions/error';
import media from '../../util/media';
import OutlinedButton from '../buttons/OutlinedButton';
import UserListItem from './UserListItem';
import CreateUser from './CreateUser';

const Header = styled.div`
  margin: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContent = styled.span`
  ${
    media.phone`
      display: none;
    `
  }
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
      if (handleHTTPResponse(res)) {
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
          <h2>Users</h2>
          <OutlinedButton onClick={this.createUser}>
            <i className="fas fa-plus" /> <ButtonContent>Create User</ButtonContent>
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
