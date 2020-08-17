import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from "./Input";
import Modal from './Modal';
import DescriptionButton from './buttons/DescriptionButton';
import Button from "./buttons/Button";
import OutlinedButton from "./buttons/OutlinedButton";
import DropDown from "./Dropdown";
import {Text} from "./Text";
import { closeAddAgentModal, selectArchitecture, selectOperatingSystem } from "../actions/add-agent";
import CopyToClipboard from "./CopyToClipboard";
import NewAgentHandler from "../lib/NewAgentHandler";
import LoadingButton from "./buttons/LoadingButton";


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

const CreateAgentButtonWrapper = styled.div`
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;
`;

const DownloadBinaryButtonWrapper = styled.div`
  float: right;
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;
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

const StyledInput = styled(Input)`
  font-family: 'B612', sans-serif;
  font-weight: 600;
  width: 200px;
  padding: 15px;
  margin: 15px;
  background-color: ${props => props.theme.lightBlack};
  color: ${props => props.theme.white};
  border: 1px solid ${props => props.error ? props.theme.error : 'transparent'};

  &:focus{
    outline: none;
    border: 1px solid ${props => props.theme.accent};
  }
`;

const CloseOutlinedButton = styled(OutlinedButton)`
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;
`;

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.bindMethods()

    this.state = {
      renderFunction : this.renderQuestion,
      title: "Choose installation",
      agentName: "",
      loading: false,
      agentNameError: false
    };
    this.newAgentHandler = new NewAgentHandler();
  };

  bindMethods() {
    this.renderQuestion = this.renderQuestion.bind(this);
    this.setRenderFunction = this.setRenderFunction.bind(this);
    this.getStepOneComponents = this.getStepOneComponents.bind(this);
    this.selectStepOneDirectly = this.selectStepOneDirectly.bind(this);
    this.selectStepOneManual = this.selectStepOneManual.bind(this);
    this.renderDirectlyOnMachineStepOne = this.renderDirectlyOnMachineStepOne.bind(this);
    this.renderDirectlyOnMachineStepTwo = this.renderDirectlyOnMachineStepTwo.bind(this);
    this.renderManualUploadStepOne = this.renderManualUploadStepOne.bind(this);
    this.renderManualUploadStepTwo = this.renderManualUploadStepTwo.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAgentNameChange = this.handleAgentNameChange.bind(this);
    this.createAgent = this.createAgent.bind(this);
    this.downloadBinary = this.downloadBinary.bind(this);
  }

  createAgent(renderFunctionCallback) {
    if (this.state.agentName === "") {
      this.setState({ agentNameError: true })
      return
    }
    this.setState({ loading: true })
    axios.post(
      `${process.env.APOLLO_HTTP_URL}agent`,
      { name : this.state.agentName },
      { withCredentials: true }
    )
      .then(response => {
        this.setState({
          agentId: response.data['id'],
          secret: response.data['oauth_client']['secret']
        })
        this.setRenderFunction(renderFunctionCallback);
      })
      .finally(_ => {
        this.setState({ loading: false })
      })
  }

  downloadBinary() {
    this.setState({ loading: true })
    axios.get(
      `${process.env.APOLLO_HTTP_URL}agent/download`,
      {
        withCredentials: true,
        params: {
          target_os: this.props.selectedOperatingSystem,
          target_arch: this.props.selectedArchitecture
        },
        responseType: 'arraybuffer'
      },
    )
      .then(response => {
        this.newAgentHandler.downloadFile(response.data)
      })
      .finally(_ => {
        this.setState({loading: false})
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
      renderFunction: this.renderManualUploadStepOne,
      title: title
    });
  };

  handleAgentNameChange(e) {
    this.setState({ agentName: e.target.value, agentNameError: false });
  }

  renderDirectlyOnMachineStepOne() {
    return this.getStepOneComponents(this.renderDirectlyOnMachineStepTwo);
  };

  renderManualUploadStepOne() {
    return this.getStepOneComponents(this.renderManualUploadStepTwo);
  };

  getStepOneComponents(onclick) {
    return(
      <div>
        <TextAndInputFieldWrapper>
          <TextWrapper>Agent name</TextWrapper>
          <InputFieldWrapper>
            <StyledInput error={this.state.agentNameError} placeholder="007" onChange={this.handleAgentNameChange} />
          </InputFieldWrapper>
        </TextAndInputFieldWrapper>
        <TextAndInputFieldWrapper>
          <TextWrapper>Operating system</TextWrapper>
          <InputFieldWrapper>
            <DropDown
              selected={this.props.selectedOperatingSystem}
              options={this.newAgentHandler.supportedOS}
              optionSelectedAction={selectOperatingSystem}
            />
          </InputFieldWrapper>
        </TextAndInputFieldWrapper>
        <TextAndInputFieldWrapper>
          <TextWrapper>Architecture</TextWrapper>
          <InputFieldWrapper>
            <DropDown
              selected={this.props.selectedArchitecture}
              options={this.newAgentHandler.supportedArch}
              optionSelectedAction={selectArchitecture}
            />
          </InputFieldWrapper>
        </TextAndInputFieldWrapper>
        <TwoColumnGrid>
          <CloseOutlinedButton onClick={this.closeModal}>
            Close
          </CloseOutlinedButton>
          <CreateAgentButtonWrapper>
            <LoadingButton loading={this.state.loading} onClick={() => this.createAgent(onclick)}>
              Create agent
            </LoadingButton>
          </CreateAgentButtonWrapper>
        </TwoColumnGrid>
      </div>
    );
  };

  getStepTwoComponents(command) {
   return(
      <ThreeRowDisplay>
        <Description>
          Copy and run the command on the target machine to download run the client.
        </Description>
        <CommandWrapper>
          <CopyToClipboard text={command} />
        </CommandWrapper>
        <CloseButton onClick={this.closeModal}>Close</CloseButton>
      </ThreeRowDisplay>
    );
  }

  renderDirectlyOnMachineStepTwo() {
    return this.getStepTwoComponents(
      this.newAgentHandler.getDirectlyOnMachineCommand(
        this.props.selectedOperatingSystem, this.props.selectedArchitecture, this.state.agentId, this.state.secret,
        "localhost:1970"
      )
    );
  };

  renderManualUploadStepTwo() {
    return(
      <div>
        <TwoColumnGrid>
          <ColumnOne>
            <Text>Download the binary and upload it to the target machine.</Text>
          </ColumnOne>
          <ColumnTwo>
            <DownloadBinaryButtonWrapper>
              <LoadingButton loading={this.state.loading} onClick={this.downloadBinary}>Download binary</LoadingButton>
            </DownloadBinaryButtonWrapper>
          </ColumnTwo>
        </TwoColumnGrid>
        {this.getStepTwoComponents(
          this.newAgentHandler.getExecuteCommand(this.state.agentId, this.state.secret, "localhost:1970")
        )}
      </div>
    );
  };

  renderQuestion() {
    const directly = "Directly on target machine.";
    const manual = "Manual upload";
    return (
      <TwoColumnGrid>
        <ColumnOne>
          <DescriptionButton onClick={() => this.selectStepOneDirectly(directly)} title={directly}>
          You have the correct permissions to download the binary directly on the target machine.
          </DescriptionButton>
        </ColumnOne>
        <ColumnTwo>
          <DescriptionButton onClick={() => this.selectStepOneManual(manual)} title={manual}>
            You download and upload the binary yourself.
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