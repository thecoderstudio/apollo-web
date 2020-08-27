import React from 'react';
import styled, { withTheme } from 'styled-components';
import { connect } from 'react-redux';
import checkIfAdmin from '../../util/admin';
import PropTypes from 'prop-types';
import axios from 'axios';
import OutlinedButton from '../buttons/OutlinedButton';
import ConfirmationModal from '../modals/ConfirmationModal';

const propTypes = {
  user: PropTypes.object.isRequired,
  userDeleteCallback: PropTypes.func.isRequired
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

const DeleteButton = styled(OutlinedButton)`
  grid-column: logout;
  float: right;
  width: 100px;
  padding 4px;
  border: 1px solid ${props => props.theme.error};
`;

class UserListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.state = { renderConfirmationModal: false };
  }

  showConfirmationModal() {
    this.setState({ renderConfirmationModal: true });
  }

  hideConfirmationModal() {
    this.setState({ renderConfirmationModal: false });
  }

  deleteUser() {
    axios.delete(
      `${process.env.APOLLO_HTTP_URL}user/${this.props.user.id}`,
      { withCredentials: true }
    ).then(_ => {
      this.props.userDeleteCallback();
      this.hideConfirmationModal();
    });
  }

  render() {
    let role;
    if (this.props.user.role !== null) {
      role = <Tag>{this.props.user.role.name}</Tag>;
    }

    return (
      <Container>
        <Username>{this.props.user.username}</Username>
        {role}
        {
          this.props.user.id !== this.props.currentUser.id && !checkIfAdmin(this.props.user) &&
          <DeleteButton onClick={this.showConfirmationModal}>delete</DeleteButton>
        }
        {this.state.renderConfirmationModal &&
          <ConfirmationModal
            title={`Are you sure you want to delete ${this.props.user.username}`}
            cancelCallback={this.hideConfirmationModal}
            confirmationButtonText='delete'
            confirmationButtonColor={this.props.theme.error}
            confirmationCallback={this.deleteUser}
          />
        }
      </Container>
    );
  }
}

UserListItem.propTypes = propTypes;

export default connect(
  state => ({ currentUser: state.currentUser })
)(withTheme(UserListItem));
