import React from 'react';
import axios from 'axios';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import ConfirmationModal from '../modals/ConfirmationModal';

const propTypes = {
  cancelCallback: PropTypes.func.isRequired,
  userDeleteCallback: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

class DeleteUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteUserAndClose = this.deleteUserAndClose.bind(this);
  }

  deleteUserAndClose() {
    axios.delete(
      `${process.env.APOLLO_HTTP_URL}user/${this.props.user.id}`,
      { withCredentials: true }
    ).then(_ => {
      this.props.userDeleteCallback();
      this.props.cancel();
    });
  }

  render() {
    return(
      <ConfirmationModal
        title={`Are you sure you want to delete ${this.props.user.username}`}
        cancelCallback={this.cancelCallback}
        confirmationButtonText='Delete'
        confirmationButtonColor={this.props.theme.error}
        confirmationCallback={this.deleteUserAndClose}
    />
    );
  }
}

DeleteUser.prototype = propTypes;

export default withTheme(DeleteUser);