import React from 'react';
import axios from 'axios';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { handleHTTPResponse } from '../../actions/error';
import ConfirmationModal from '../modals/ConfirmationModal';

const propTypes = {
  closeFunction: PropTypes.func.isRequired,
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
      this.props.closeFunction();
    })
    .catch(error => {
      handleHTTPResponse(error.response);
      this.props.closeFunction();
    });

  }

  render() {
    return(
      <ConfirmationModal
        title={`Are you sure you want to delete ${this.props.user.username}`}
        closeModalFunction={this.props.closeFunction}
        confirmationButtonText='Delete'
        confirmationBu ttonColor={this.props.theme.error}
        confirmationCallback={this.deleteUserAndClose}
    />
    );
  }
}

DeleteUser.propTypes = propTypes;

export default withTheme(DeleteUser);