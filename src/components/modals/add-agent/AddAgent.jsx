import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { downloadResponse } from '../../../util/http';
import media from '../../../util/media';
import OutlinedButton from '../../buttons/OutlinedButton';
import LoadingButton from '../../buttons/LoadingButton';
import CopyToClipboard from '../../CopyToClipboard';
import NewAgentHandler from '../../../lib/NewAgentHandler';
import { handleHTTPResponse } from '../../../actions/error';

const propTypes = {
  manualUpload: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  agentData: PropTypes.object.isRequired
};

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: [column-one] 50% [column-two] 50%;
  margin: 20px 0px 20px 0px;

  ${media.phone`
    grid-template-columns: [column-one] 100%;
    grid-template-rows: [row-one] 1fr [row-two] 1fr;
  `}
`;

const ColumnOne = styled.div`
  grid-column: column-one;
  margin-right: 10px;

  ${media.phone`
    grid-row: row-one;
    margin-right: 0px;
    margin: 15px;
  `}
`;

const ColumnTwo = styled.div`
  grid-column: column-two;
  margin-left: 10px;

  ${media.phone`
    grid-column: column-one;
    grid-row: row-two;
    margin-left: 0px;
    margin: 15px;
  `}
`;

const StyledButton = styled(OutlinedButton)`
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;
`;

const DownloadBinaryButton = styled(LoadingButton)`
  float: right;
  width: 200px;
  height: 50px;
  margin: auto;
  display: block;

  ${media.phone`
    float: none;
    margin-left: auto;
    margin-right: auto;
  `}
`;

const ThreeRowDisplay = styled.div`
  display: grid;
  grid-template-rows: [description] 1fr [commands] 1fr [button] 1fr
`;

const StyledCopyToClipboard = styled(CopyToClipboard)`
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

class AddAgent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.newAgentHandler = new NewAgentHandler();
    this.state = {
      loading: false
    };
    this.getCommand = this.getCommand.bind(this);
    this.downloadBinary = this.downloadBinary.bind(this);
  }

  getCommand() {
    let command;
    const { agentData, manualUpload } = this.props;

    if (manualUpload) {
      command = this.newAgentHandler.getExecuteCommand(
        agentData.agentId,
        agentData.secret
      );
    } else {
      command = this.newAgentHandler.getDirectlyOnMachineCommand(
        agentData.selectedOperatingSystem,
        agentData.selectedArchitecture,
        agentData.agentId,
        agentData.secret
      );
    }
    return command;
  }

  downloadBinary() {
    const { agentData } = this.props;

    this.setState({ loading: true });
    axios.get(
      `${process.env.APOLLO_HTTP_URL}agent/download`,
      {
        withCredentials: true,
        params: {
          target_os: agentData.selectedOperatingSystem,
          target_arch: agentData.selectedArchitecture
        },
        responseType: 'arraybuffer'
      }
    )
      .then(response => {
        downloadResponse(response, 'apollo-agent.bin');
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, false);
      })
      .finally(_ => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { manualUpload, onClose } = this.props;
    const { loading } = this.state;

    return (
      <div>
        {manualUpload
          && (
          <TwoColumnGrid>
            <ColumnOne>
              Download the binary and upload it to the target machine.
            </ColumnOne>
            <ColumnTwo>
              <DownloadBinaryButton id='downloadBinaryButton' loading={loading} onClick={this.downloadBinary}>
                Download binary
              </DownloadBinaryButton>
            </ColumnTwo>
          </TwoColumnGrid>
          )}

        <ThreeRowDisplay>
          <Description>
            Copy and run the command on the target machine to download run the client.
          </Description>
          <StyledCopyToClipboard text={this.getCommand()} />
          <CloseButton id='closeButton' onClick={onClose}>Close</CloseButton>
        </ThreeRowDisplay>
      </div>
    );
  }
}

AddAgent.propTypes = propTypes;

export default AddAgent;
