import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import Input from "../Input";
import ModalOverlay from './ModalOverlay';
import DescriptionButton from '../buttons/DescriptionButton';
import Card from '../Card';
import OutlinedButton from "../buttons/OutlinedButton";
import DropDown from "../Dropdown";
import { createAgentSchema } from '../../validation/agent';
import { parseHTTPErrors } from '../../util/parser';
import { selectArchitecture, selectOperatingSystem } from "../../actions/add-agent";
import { handleHTTPResponse } from '../../actions/error';
import CopyToClipboard from "../CopyToClipboard";
import NewAgentHandler from "../../lib/NewAgentHandler";
import LoadingButton from "../buttons/LoadingButton";
import PropTypes from 'prop-types';
import media from '../../util/media';

const propTypes = {
  onClose: PropTypes.func.isRequired
}

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: [title] 50px [content] 1fr;
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  max-width: 600px;
  width: 100%;
  height: auto;
  background-color: ${props => props.theme.black}
`;

const Title = styled.h2`
  grid-row: title;
  width: 75%;
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.div`
  grid-row: content;
  padding: 20px;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: [column-one] 50% [column-two] 50%;
  margin: 20px 0px 20px 0px;

  ${
    media.phone`
      grid-template-columns: [column-one] 100%;
      grid-template-rows: [row-one] 1fr [row-two] 1fr;
    `
  }
`;

const ColumnOne = styled.div`
  grid-column: column-one;
  margin-right: 10px;

  ${
    media.phone`
      grid-row: row-one;
      margin-right: 0px;
      margin: 15px;
    `
  }
`;

const ColumnTwo = styled.div`
  grid-column: column-two;
  margin-left: 10px;

  ${
    media.phone`
      grid-column: column-one;
      grid-row: row-two;
      margin-left: 0px;
      margin: 15px;
    `
  }
`;

const StyledDescriptionButton = styled(DescriptionButton)`
  width: 100%;
`;

const TextAndInputFieldWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: [text] 60% [dropdown] 40%;
  height: 100px;
`;

const InputFieldWrapper = styled.div`
  grid-column: dropdown;
`;

const TextWrapper = styled.p`
  grid-column: text;
  line-height: 75px;
`;

const StyledButton = styled(OutlinedButton)`
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;
`;

const CreateAgentButton = styled(LoadingButton)`
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;

  ${
    media.phone`
      width: 100%;
      margin-top: 15px;
    `
  }
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

const Description = styled.p`
  grid-row: description;
  margin: 20px 0px 20px 0px;
`;

const StyledInput = styled(Input)`
  font-family: 'B612', sans-serif;
  font-weight: 600;
  width: 200px;
  margin: 15px;
`;

const CloseOutlinedButton = styled(OutlinedButton)`
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;

  ${
    media.phone`
      width: 100%;
      grid-row: row-two;
    `
  }
`;

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.bindMethods();

    this.state = {
      renderFunction : this.renderQuestion,
      title: "Choose installation",
      loading: false,
    };
    this.newAgentHandler = new NewAgentHandler();
  }

  bindMethods() {
    this.renderQuestion = this.renderQuestion.bind(this);
    this.setRenderFunction = this.setRenderFunction.bind(this);
    this.getStepOneComponents = this.getStepOneComponents.bind(this);
    this.selectStepOneDirectly = this.selectStepOneDirectly.bind(this);
    this.selectStepOneManual = this.selectStepOneManual.bind(this);
    this.renderDirectlyOnMachineStepOne = this.renderDirectlyOnMachineStepOne.bind(this);
    this.renderDirectlyOnMachineStepTwo = this.renderDirectlyOnMachineStepTwo.bind(this);
    this.renderManualUploadStepOne = this.renderManualUploadStepOne.bind(this);
    this.setFinalRenderFunction = this.setFinalRenderFunction.bind(this);
    this.renderManualUploadStepTwo = this.renderManualUploadStepTwo.bind(this);
    this.createAgent = this.createAgent.bind(this);
    this.downloadBinary = this.downloadBinary.bind(this);
  }

  createAgent(values, { setErrors }) {
    this.setState({ loading: true });
    axios.post(
      `${process.env.APOLLO_HTTP_URL}agent`,
      values,
      { withCredentials: true }
    )
      .then(response => {
        this.setState({
          agentId: response.data['id'],
          secret: response.data['oauth_client']['secret']
        });
        this.setFinalRenderFunction();
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data, { name: 'name' }));
        }
      })
      .finally(_ => {
        this.setState({ loading: false });
      });
  }

  downloadBinary() {
    this.setState({ loading: true });
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
        this.newAgentHandler.downloadFile(response.data);
      })
      .finally(_ => {
        this.setState({loading: false});
      });
  }

  setFinalRenderFunction() {
    console.log(this.state.renderFunction)
    if (this.state.renderFunction == this.renderDirectlyOnMachineStepOne) {
      this.setState({ renderFunction: this.renderDirectlyOnMachineStepTwo })
    } else {
      this.setState({ renderFunction: this.renderManualUploadStepTwo })
    }
  }

  setRenderFunction(renderFunction) {
    this.setState({ renderFunction });
  }

  selectStepOneDirectly(title) {
    this.setState({
      renderFunction: this.renderDirectlyOnMachineStepOne,
      title
    });
  }

  selectStepOneManual(title) {
    this.setState({
      renderFunction: this.renderManualUploadStepOne,
      title
    });
  }

  renderDirectlyOnMachineStepOne() {
    return this.getStepOneComponents(this.renderDirectlyOnMachineStepTwo);
  }

  renderManualUploadStepOne() {
    return this.getStepOneComponents(this.renderManualUploadStepTwo);
  }

  getStepOneComponents(onclick) {
    return(
      <div>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={createAgentSchema}
          onSubmit={this.createAgent}>
          {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextAndInputFieldWrapper>
              <TextWrapper>Agent name</TextWrapper>
              <InputFieldWrapper>
                <StyledInput
                  inverted
                  name="name"
                  type="name"
                  value={values.name}
                  error={errors.name}
                  placeholder="007"
                  onChange={handleChange} />
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
              <CloseOutlinedButton type='button' id='closeButton' onClick={this.props.onClose}>
                Cancel
              </CloseOutlinedButton>
              <CreateAgentButton type='submit' id='createAgentButton' loading={this.state.loading}>
                Create agent
              </CreateAgentButton>
            </TwoColumnGrid>
          </form>
          )}
        </Formik>
      </div>
    );
  }

  getStepTwoComponents(command) {
   return(
      <ThreeRowDisplay>
        <Description>
          Copy and run the command on the target machine to download run the client.
        </Description>
        <CommandWrapper>
          <CopyToClipboard id='copytoclip' text={command} />
        </CommandWrapper>
        <CloseButton id='closeButton' onClick={this.props.onClose}>Close</CloseButton>
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
  }

  renderManualUploadStepTwo() {
    return(
      <div>
        <TwoColumnGrid>
          <ColumnOne>
            Download the binary and upload it to the target machine.
          </ColumnOne>
          <ColumnTwo>
            <DownloadBinaryButtonWrapper>
              <LoadingButton id='downloadBinaryButton' loading={this.state.loading} onClick={this.downloadBinary}>Download binary</LoadingButton>
            </DownloadBinaryButtonWrapper>
          </ColumnTwo>
        </TwoColumnGrid>
        {this.getStepTwoComponents(
          this.newAgentHandler.getExecuteCommand(this.state.agentId, this.state.secret, "localhost:1970")
        )}
      </div>
    );
  }

  renderQuestion() {
    const directly = "Directly on target machine.";
    const manual = "Manual upload";
    return (
      <TwoColumnGrid>
        <ColumnOne>
          <StyledDescriptionButton id='directlyButton' onClick={() => this.selectStepOneDirectly(directly)} title={directly}>
          You have the correct permissions to download the binary directly on the target machine.
          </StyledDescriptionButton>
        </ColumnOne>
        <ColumnTwo>
          <StyledDescriptionButton id='manualButton' onClick={() => this.selectStepOneManual(manual)} title={manual}>
            You download and upload the binary yourself.
          </StyledDescriptionButton>
        </ColumnTwo>
      </TwoColumnGrid>
    );
  }

  render() {
    return (
      <ModalOverlay>
        <StyledCard>
          <Title>Add new agent</Title>
          <Content>{this.state.renderFunction()}</Content>
        </StyledCard>
      </ModalOverlay>
    );
  }
}

AddAgentModal.propTypes = propTypes;

export default connect(
  state => ({
    selectedOperatingSystem: state.addAgent.selectedOperatingSystem,
    selectedArchitecture: state.addAgent.selectedArchitecture
  })
)(AddAgentModal);