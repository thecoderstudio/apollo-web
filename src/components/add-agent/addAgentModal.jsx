import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../Modal';
import DescriptionButton from '../buttons/DescriptionButton';
import DropDown from "../Drowdown";

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

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderDirectlyOnMachineStepOne = this.renderDirectlyOnMachineStepOne.bind(this)
    this.renderDirectlyOnMachineStepTwo = this.renderDirectlyOnMachineStepTwo.bind(this)
    this.state = { renderFunction : this.renderDirectlyOnMachineStepOne, title: "Choose Intallation"};
  };

  renderDirectlyOnMachineStepOne() {
    // this.setState({title: "Directly on target machine"})
    return(
      <DropDown options={[1,2,3]}>
        [1,2,3]
      </DropDown>
    );
  };

  renderDirectlyOnMachineStepTwo() {
    return(
      <DropDown />
    );
  };

  renderQuestion() {
    return (
      <ButtonsWrapper>
        <DirectlyButtonWraper>
          <DescriptionButton title='Directly on target machine'>
          You have the correct permissions to download and install the binary directly on the target machine.
          </DescriptionButton>
        </DirectlyButtonWraper>
        <ManualButtonWraper>
          <DescriptionButton title='Manual'>
            You download, upload and install the binary yourself.
          </DescriptionButton>
        </ManualButtonWraper>
      </ButtonsWrapper>
    )
  }

  render() {
    return (
      <Modal visible={this.props.modalVisible} title={this.state.title}>
        {this.state.renderFunction()}
      </Modal>
    );
  }
}

export default connect(
  state => ({ modalVisible: state.addAgentModalVisible })
)(AddAgentModal)