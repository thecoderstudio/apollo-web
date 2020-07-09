import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../Modal';
import DescriptionButton from '../buttons/DescriptionButton';

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Modal visible={this.props.modalVisible} title='jemoeder'>
        <DescriptionButton title='Directly on target machine'>
          You have the correct permissions to download and install the binary directly on the target machine.
        </DescriptionButton>
        <DescriptionButton title='Manual'>
          You download, upload and install the binary yourself.
        </DescriptionButton>
      </Modal>
    );
  }
}

export default connect(
  state => ({ modalVisible: state.addAgentModalVisible })
)(AddAgentModal)