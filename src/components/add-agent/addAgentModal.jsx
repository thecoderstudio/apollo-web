import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../Modal';
import DescriptionButton from '../buttons/DescriptionButton';
import Button from "../buttons/Button";
import DropDown from "../Drowdown";
import {Text} from "../Text";
import { closeAddAgentModal } from "../../actions/add-agent";
import CopyToClipboard from "../CopyToClipboard";


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

const DropDownAndTextWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: [text] 60% [dropdown] 40%; 
  height: 75px;
`;

const DropDownWrapper = styled.div`
  grid-column: dropdown; 
`;
const TextWrapper = styled(Text)`
  grid-column: text;
  line-height: 75px;
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;
  margin-top: 25px;
`;

const ThreeRowDisplay = styled.div`
  display: grid;
  grid-template-rows: [description] 1fr [commands] 1fr [button] 1fr 
`;

const CommandWrapper = styled.div`
  grid-row: commands;
`;
const CloseButton = styled(StyledButton)`
  grid-row: button;
`;
const Description = styled(Text)`
  grid-row: description;
  text-align: center;
`;

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderDirectlyOnMachineStepOne = this.renderDirectlyOnMachineStepOne.bind(this);
    this.renderDirectlyOnMachineStepTwo = this.renderDirectlyOnMachineStepTwo.bind(this);
    this.setRenderFunction = this.setRenderFunction.bind(this);
    this.closeModal = this.closeModal.bind(this)
    this.state = { renderFunction : this.renderDirectlyOnMachineStepTwo, title: "Choose installation" };
  };

  closeModal() {
    const { dispatch } = this.props;
    dispatch(closeAddAgentModal());
  }

  setRenderFunction(renderFunction) {
    this.setState({ renderFunction: renderFunction});
  }

  renderDirectlyOnMachineStepOne() {
    this.setState({title: "Directly on target machine"});
    return(
      <div>
        <DropDownAndTextWrapper>
          <TextWrapper>Operating system</TextWrapper>
          <DropDownWrapper>
            <DropDown options={[1,2,3]} />
          </DropDownWrapper>
        </DropDownAndTextWrapper>
        <DropDownAndTextWrapper>
          <TextWrapper>Architecture</TextWrapper>
          <DropDownWrapper>
            <DropDown options={[1,2,3]} />
          </DropDownWrapper>
        </DropDownAndTextWrapper>
        <StyledButton onClick={() => this.setRenderFunction(this.renderDirectlyOnMachineStepTwo)}>
          Create agent
        </StyledButton>
      </div>
    );
  };

  renderDirectlyOnMachineStepTwo() {
    return(
      <ThreeRowDisplay>
        <Description>
          Copy and run the command on the target machine to install the client.
        </Description>
        <CommandWrapper>
          <CopyToClipboard text={"ooi"} />
        </CommandWrapper>
        <CloseButton onClick={this.closeModal}> Close </CloseButton>
      </ThreeRowDisplay>
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