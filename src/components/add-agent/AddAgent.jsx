import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import CreateAgent from './CreateAgent';
import media from '../../util/media';
import OutlinedButton from '../buttons/OutlinedButton';
import LoadingButton from '../buttons/LoadingButton';
import CopyToClipboard from '../CopyToClipboard';
import NewAgentHandler from "../../lib/NewAgentHandler";

const propTypes = {
  manualUpload: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
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

  ${
    media.phone`
      float: none;
      margin-left: auto;
      margin-right: auto;
    `
  }
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
      agentCreated: false,
      selectedArchitecture: null,
      selectedOperatingSystem: null
		};
	}

	downloadBinary = () => {
    this.setState({ loading: true });
    console.log(this.state);
    axios.get(
      `${process.env.APOLLO_HTTP_URL}agent/download`,
      {
        withCredentials: true,
        params: {
          target_os: this.state.selectedOperatingSystem,
          target_arch: this.state.selectedArchitecture
        },
        responseType: 'arraybuffer'
      },
    )
      .then(response => {
        this.newAgentHandler.downloadFile(response.data);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response)
      })
      .finally(_ => {
        this.setState({loading: false});
      });
  };

  selectArchitecture = (value) => {
    this.setState({ selectedArchitecture: value })
  };

  selectOperatingSystem = (value) => {
    this.setState({ selectedOperatingSystem: value });
  };

  getCopyToClipboardComponents = (command) => {
		return(
			 <ThreeRowDisplay>
				 <Description>
					 Copy and run the command on the target machine to download run the client.
				 </Description>
				 <StyledCopyToClipboard id='copytoclip' text={command} />
				 <CloseButton id='closeButton' onClick={this.props.onClose}>Close</CloseButton>
			 </ThreeRowDisplay>
		 );
	 }

	createAgentSuccessCallback = (response, architecure, operatingSystem) => {
		this.setState({
      agentCreated: true,
			agentId: response.data['id'],
      secret: response.data['oauth_client']['secret'],
      selectedOperatingSystem: operatingSystem,
      selectedArchitecture: architecure
    });
	};

	getCommand = () => {
		let command;
		if (this.props.manualUpload) {
			command = this.newAgentHandler.getExecuteCommand(this.state.agentId, this.state.secret, "localhost:1970")
		} else {
			command = this.newAgentHandler.getDirectlyOnMachineCommand(
        this.props.selectedOperatingSystem, this.props.selectedArchitecture, this.state.agentId, this.state.secret,
        "localhost:1970"
      )
    }
    return command;
	};

  render() {
    return (
			<div>
				{this.state.agentCreated ?
					<div>
						{this.props.manualUpload &&
							<TwoColumnGrid>
								<ColumnOne>
									Download the binary and upload it to the target machine.
								</ColumnOne>
								<ColumnTwo>
									<DownloadBinaryButton id='downloadBinaryButton' loading={this.state.loading} onClick={this.downloadBinary}>
										Download binary
									</DownloadBinaryButton>
								</ColumnTwo>
							</TwoColumnGrid>
						}

						<ThreeRowDisplay>
							<Description>
								Copy and run the command on the target machine to download run the client.
							</Description>
							<StyledCopyToClipboard id='copytoclip' text={this.getCommand()} />
							<CloseButton id='closeButton' onClick={this.props.onClose}>Close</CloseButton>
						</ThreeRowDisplay>

					</div>
          :
          <CreateAgent createAgentSuccessCallback={this.createAgentSuccessCallback} />
				}
			</div>
    );
  }
}

AddAgent.propTypes = propTypes;

export default AddAgent;