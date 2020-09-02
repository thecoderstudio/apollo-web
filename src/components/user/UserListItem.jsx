import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import checkIfAdmin from '../../util/admin';
import DeleteUser from '../user/DeleteUser';
import Icon from '../Icon';

const propTypes = {
  user: PropTypes.object.isRequired,
  userDeleteCallback: PropTypes.func
};

const Container = styled.div`
  min-height: 60px;
  padding: 0px 16px;
  margin: 0px;
  display: grid;
  grid-template-columns: 3fr 1fr 25px;
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

const DeleteIcon = styled(Icon)`
  color: ${props => props.theme.error};
  float: right;
  margin-right: 10px;
  grid-column: 3;
`;

class UserListItem extends React.PureComponent {
  constructor(props) {
    super(props);
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
          <DeleteIcon onClick={this.showConfirmationModal} className="far fa-trash-alt" />
        }
        {this.state.renderConfirmationModal &&
          <DeleteUser
            closeFunction={this.hideConfirmationModal}
            userDeleteCallback={this.props.userDeleteCallback}
            user={this.props.user}
          />
        }
      </Container>
    );
  }
}

UserListItem.propTypes = propTypes;

export default connect(
  state => ({ currentUser: state.currentUser })
)(UserListItem);
