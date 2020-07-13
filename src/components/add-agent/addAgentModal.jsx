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


const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: [column-one] 50% [column-two] 50%;
  margin: 15px 15px 20px 0px;
`;

const ColumnOne = styled.div`
  grid-column: column-one;
  margin-right: 10px;
`;

const ColumnTwo = styled.div`
  grid-column: column-two;
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
`;

const DownloadBinaryButton = styled(StyledButton)`
  float: right;
`;

const ThreeRowDisplay = styled.div`
  display: grid;
  grid-template-rows: [description] 1fr [commands] 1fr [button] 1fr 
`;

const CommandWrapper = styled.div`
  grid-row: commands;
  margin-bottom: 15px;
`;

const CloseButton = styled(StyledButton)`
  grid-row: button;
`;

const Description = styled(Text)`
  grid-row: description;
  margin: 15px 0px 15px 0px;
`;

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.getStepOneComponents = this.getStepOneComponents.bind(this);
    this.renderDirectlyOnMachineStepOne = this.renderDirectlyOnMachineStepOne.bind(this);
    this.renderDirectlyOnMachineStepTwo = this.renderDirectlyOnMachineStepTwo.bind(this);
    this.renderManualInstallationStepOne = this.renderManualInstallationStepOne.bind(this);
    this.renderManualInstallationStepTwo = this.renderManualInstallationStepTwo.bind(this);
    this.setRenderFunction = this.setRenderFunction.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = { renderFunction : this.renderManualInstallationStepTwo, title: "Choose installation" };
  };

  closeModal() {
    const { dispatch } = this.props;
    dispatch(closeAddAgentModal());
  }

  setRenderFunction(renderFunction) {
    this.setState({ renderFunction: renderFunction});
  }

  handleStepOneDirectly(title) {
    this.setState({
      renderFunction: this.renderStepOne(),
      title: title
    });
  };

  getStepOneComponents(onclick) {
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
        <StyledButton onClick={() => this.setRenderFunction(onclick)}>
          Create agent
        </StyledButton>
      </div>
    );
  };

  renderDirectlyOnMachineStepOne() {
    return this.getStepOneComponents(this.renderDirectlyOnMachineStepTwo);
  };

  getStepTwoComponents(command) {
   return(
      <ThreeRowDisplay>
        <Description>
          Copy and run the command on the target machine to install the client.
        </Description>
        <CommandWrapper>
          <CopyToClipboard text={command} />
        </CommandWrapper>
        <CloseButton onClick={this.closeModal}>Close</CloseButton>
      </ThreeRowDisplay>
    );
  }

  renderDirectlyOnMachineStepTwo() {
    return this.getStepTwoComponents("command");
  };

  renderManualInstallationStepOne() {
    return this.getStepOneComponents(this.renderManualInstallationStepTwo);
  };

  renderManualInstallationStepTwo() {
    return(
      <div>
        <TwoColumnGrid>
          <ColumnOne>
            <Text>Download the binary and upload it to the target machine.</Text>
          </ColumnOne>
          <ColumnTwo>
            <DownloadBinaryButton>Download binary</DownloadBinaryButton>
          </ColumnTwo>
        </TwoColumnGrid>
        {this.getStepTwoComponents("command")}
      </div>
    );
  };

  renderQuestion() {
    const directly = "Directly on target machine.";
    const manual = "Manual installation";
    return (
      <TwoColumnGrid>
        <ColumnOne>
          <DescriptionButton onclick={() => this.handleStepOne(directly)} title={directly}>
          You have the correct permissions to download and install the binary directly on the target machine.
          </DescriptionButton>
        </ColumnOne>
        <ColumnTwo>
          <DescriptionButton onclick={() => this.handleStepOne(manual)} title={manual}>
            You download, upload and install the binary yourself.
          </DescriptionButton>
        </ColumnTwo>
      </TwoColumnGrid>
    );
  };

  render() {
    return (
      <Modal visible={this.props.modalVisible} title={this.state.title}>
        {this.state.renderFunction()}
      </Modal>
    );
  };
}

export default connect(
  state => ({ modalVisible: state.addAgentModalVisible })
)(AddAgentModal)