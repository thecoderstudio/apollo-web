import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from "../Input";
import Modal from '../Modal';
import DescriptionButton from '../buttons/DescriptionButton';
import Button from "../buttons/Button";
import DropDown from "../Drowdown";
import {Text} from "../Text";
import { closeAddAgentModal, selectArchitecture, selectOperatingSystem } from "../../actions/add-agent";
import CopyToClipboard from "../CopyToClipboard";


const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: [column-one] 50% [column-two] 50%;
  margin: 20px 0px 20px 0px;
`;

const ColumnOne = styled.div`
  grid-column: column-one;
  margin-right: 10px;
`;

const ColumnTwo = styled.div`
  grid-column: column-two;
  margin-left: 10px;
`;

const TextAndInputFieldWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: [text] 60% [dropdown] 40%; 
  height: 80px;
`;

const InputFieldWrapper = styled.div`
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
  margin-bottom: 20px;
`;

const CloseButton = styled(StyledButton)`
  grid-row: button;
  margin-top: 20px;
`;

const Description = styled(Text)`
  grid-row: description;
  margin: 20px 0px 20px 0px;
`;

const CreateAgentButton = styled(StyledButton)`
  margin-top: 20px;
`;

const StyledInput = styled(Input)`
  font-family: 'B612', sans-serif;
  font-weight: 600;
  width: 200px;
  padding: 15px;
  margin: 15px;
  background-color: ${props => props.theme.lightBlack};
  color: ${props => props.theme.white}; 
  border: 1px solid transparent;
   
  &:focus{
    outline: none;
    border: 1px solid ${props => props.theme.accent};  
  }
  
 
`;

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.bindMethods()
    this.state = {
      renderFunction : this.renderQuestion,
      title: "Choose installation",
      agentName: ""
    };
  };

  bindMethods() {
    this.renderQuestion = this.renderQuestion.bind(this);
    this.setRenderFunction = this.setRenderFunction.bind(this);
    this.getStepOneComponents = this.getStepOneComponents.bind(this);
    this.selectStepOneDirectly = this.selectStepOneDirectly.bind(this);
    this.selectStepOneManual = this.selectStepOneManual.bind(this);
    this.renderDirectlyOnMachineStepOne = this.renderDirectlyOnMachineStepOne.bind(this);
    this.renderDirectlyOnMachineStepTwo = this.renderDirectlyOnMachineStepTwo.bind(this);
    this.renderManualInstallationStepOne = this.renderManualInstallationStepOne.bind(this);
    this.renderManualInstallationStepTwo = this.renderManualInstallationStepTwo.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  createAgent() {
    axios.post(
      `${process.env.APOLLO_HTTP_URL}/agent`,
      { withCredentials: true }
    )
      .then(res => {
        if (res.status === 200) {
          this.props.dispatch(loginAction());
        }
      });
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(closeAddAgentModal());
    this.setState({ renderFunction: this.renderQuestion });
  }

  setRenderFunction(renderFunction) {
    this.setState({ renderFunction: renderFunction});
  }

  selectStepOneDirectly(title) {
    this.setState({
      renderFunction: this.renderDirectlyOnMachineStepOne,
      title: title
    });
  };

  selectStepOneManual(title) {
    this.setState({
      renderFunction: this.renderManualInstallationStepOne,
      title: title
    });
  };

  handleAgentNameChange(e) {
    this.setState({ agentName: e.target.value });
  }

  getStepOneComponents(onclick) {
    return(
      <div>
        <TextAndInputFieldWrapper>
          <TextWrapper>Agent name</TextWrapper>
          <InputFieldWrapper>
            <StyledInput placeholder="007" onChange={this.handleAgentNameChange} />
          </InputFieldWrapper>
        </TextAndInputFieldWrapper>
        <TextAndInputFieldWrapper>
          <TextWrapper>Operating system</TextWrapper>
          <InputFieldWrapper>
            <DropDown
              selected={this.props.selectedOperatingSystem}
              options={[1,2,3]}
              optionSelectedAction={selectOperatingSystem}
            />
          </InputFieldWrapper>
        </TextAndInputFieldWrapper>
        <TextAndInputFieldWrapper>
          <TextWrapper>Architecture</TextWrapper>
          <InputFieldWrapper>
            <DropDown
              selected={this.props.selectedArchitecture}
              options={[1,2,3]}
              optionSelectedAction={selectArchitecture}
            />
          </InputFieldWrapper>
        </TextAndInputFieldWrapper>
        <CreateAgentButton onClick={() => this.setRenderFunction(onclick)}>
          Create agent
        </CreateAgentButton>
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
          <DescriptionButton onClick={() => this.selectStepOneDirectly(directly)} title={directly}>
          You have the correct permissions to download and install the binary directly on the target machine.
          </DescriptionButton>
        </ColumnOne>
        <ColumnTwo>
          <DescriptionButton onClick={() => this.selectStepOneManual(manual)} title={manual}>
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
  state => ({
    modalVisible: state.addAgent.modalVisible,
    selectedOperatingSystem: state.addAgent.selectedOperatingSystem,
    selectedArchitecture: state.addAgent.selectedArchitecture
  })
)(AddAgentModal)