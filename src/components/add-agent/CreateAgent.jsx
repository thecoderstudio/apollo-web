import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Formik } from 'formik';
import { StatusCodes } from 'http-status-codes';
import PropTypes from 'prop-types';
import DropDown from '../Dropdown';
import LoadingButton from '../buttons/LoadingButton';
import Input from '../Input';
import OutlinedButton from '../buttons/OutlinedButton';
import { createAgentSchema } from '../../validation/agent';
import { parseHTTPErrors } from '../../util/parser';
import { handleHTTPResponse } from '../../actions/error';
import media from '../../util/media';
import NewAgentHandler from "../../lib/NewAgentHandler";


const propTypes = {
  createAgentSuccessCallback: PropTypes.func.isRequired
};

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

const TextAndInputFieldWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: [text] 50% [dropdown] 50%;

  ${
    media.phone`
      grid-template-columns: [column-one] 100%;
      grid-template-rows: [text] 30px [dropdown] 85px;
    `
  }
`;

const InputFieldWrapper = styled.div`
  grid-column: dropdown;

  ${
    media.phone`
      grid-column: column-one;
      grid-row: dropdown;
      width: 100%;
    `
  }
`;

const StyledDropDown = styled(DropDown)`
  width: 200px;
  float: right;

  ${
    media.phone`
      width: 100%;
    `
  }
`;

const TextWrapper = styled.p`
  grid-column: text;
  line-height: 75px;
  margin-top: 0px;
  margin-bottom: 0px;

  ${
    media.phone`
      width: 100%;
      line-height: 100%;
      grid-column: column-one;
      grid-row: text;
    `
  }
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

const StyledInput = styled(Input)`
  font-family: 'B612', sans-serif;
  font-weight: 600;
  width: 200px;
  float: right;

  ${
    media.phone`
      width: 100%;
      grid-row: row-two;
    `
  }
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

class CreateAgent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.newAgentHandler = new NewAgentHandler();
    this.state = {
      selectedOperatingSystem: this.newAgentHandler.supportedOS[0],
      selectedArchitecture: this.newAgentHandler.supportedArch[0]
    };
  }

  createAgent = (values, { setErrors }) => {
    this.setState({ loading: true });
    axios.post(
      `${process.env.APOLLO_HTTP_URL}agent`,
      values,
      { withCredentials: true }
    )
      .then(response => {
        this.props.createAgentSuccessCallback(
          response,
          this.state.selectedArchitecture,
          this.state.selectedOperatingSystem
        );
      })
      .catch(error => {
        console.log(error)
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data, { name: 'name' }));
        }
      })
      .finally(_ => {
        this.setState({ loading: false });
      });
  };

  selectArchitecture = (value) => {
    this.setState({ selectedArchitecture: value })
  };

  selectOperatingSystem = (value) => {
    this.setState({ selectedOperatingSystem: value });
    this.props
  };

  render() {
    return(
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
                  <StyledDropDown
                    selected={this.state.selectedOperatingSystem}
                    options={this.newAgentHandler.supportedOS}
                    optionSelectedAction={this.selectOperatingSystem}
                  />
                </InputFieldWrapper>
              </TextAndInputFieldWrapper>
              <TextAndInputFieldWrapper>
                <TextWrapper>Architecture</TextWrapper>
                <InputFieldWrapper>
                  <StyledDropDown
                    selected={this.state.selectedArchitecture}
                    options={this.newAgentHandler.supportedArch}
                    optionSelectedAction={this.selectArchitecture}
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
    );
  }
}

CreateAgent.propTypes = propTypes;

export default CreateAgent;