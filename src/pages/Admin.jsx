import React from 'react';
import UserList from '../components/user/UserList';
import Card from '../components/Card';

export default function Admin(props) {
  return (
    <div>
      <h1>Admin dashboard</h1>
      <Card>
        <UserList />
      </Card>
    </div>
  );
}
