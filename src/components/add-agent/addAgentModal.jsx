import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../Modal';
import DescriptionButton from '../buttons/DescriptionButton';

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: [directly] 50% [manual] 50%;
`;

const DirectlyButtonWraper = styled.div`
  grid-column: directly;
  margin-right: 10px;
`;

const ManualButtonWraper = styled.div`
  grid-column: manual;
  margin-left: 10px;
`;

const StyledDescriptiveButtion = styled(DescriptionButton)`
  > Outlinedbutton {
    border: 1px solid ${props => props.theme.white};
  }

`;

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Modal visible={this.props.modalVisible} title='jemoeder'>
        <ButtonsWrapper>
          <DirectlyButtonWraper>
            <StyledDescriptiveButtion title='Directly on target machine'>
            You have the correct permissions to download and install the binary directly on the target machine.
            </StyledDescriptiveButtion>
          </DirectlyButtonWraper>
          <ManualButtonWraper>
            <StyledDescriptiveButtion title='Manual'>
             You download, upload and install the binary yourself.
            </StyledDescriptiveButtion>
          </ManualButtonWraper>
        </ButtonsWrapper>
      </Modal>
    );
  }
}

export default connect(
  state => ({ modalVisible: state.addAgentModalVisible })
)(AddAgentModal)