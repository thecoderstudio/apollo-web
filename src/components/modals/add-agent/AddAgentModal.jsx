import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay';
import Card from '../../Card';
import NewAgentHandler from '../../../lib/NewAgentHandler';
import media from '../../../util/media';
import AddAgent from './AddAgent';
import CreateAgent from './CreateAgent';
import DownloadAgentChoice from './DownloadAgentChoice';

const propTypes = {
  onClose: PropTypes.func.isRequired
};

const StyledCard = styled(Card)`
  background-color: ${(props) => props.theme.black};
  position: fixed;

  top: 50%;
  left: 50%;
  max-width: 600px;
  transform:translate(-50%, -50%);
  width: 100%;

  ${media.phone`
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 15px 0px 15px 0px;
    width: auto;
    transform: none;
  `}
`;

const ScrollableContent = styled.div`
  display: grid;
  grid-template-rows: [title] 50px [content] 1fr;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
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

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.newAgentHandler = new NewAgentHandler();
    this.state = {
      manualUpload: null,
      agentCreated: false
    };
    this.createAgentSuccessCallback = this.createAgentSuccessCallback.bind(this);
    this.setManualUpload = this.setManualUpload.bind(this);
  }

  setManualUpload(value) {
    this.setState({ manualUpload: value });
  }

  createAgentSuccessCallback(response, architecture, operatingSystem) {
    this.setState({
      agentCreated: true,
      agentData: {
        agentId: response.data.id,
        secret: response.data.oauth_client.secret,
        selectedOperatingSystem: operatingSystem,
        selectedArchitecture: architecture
      }
    });
  }

  render() {
    let content;
    const { agentCreated, manualUpload, agentData } = this.state;
    const { onClose } = this.props;

    if (manualUpload === null) {
      content = <DownloadAgentChoice setManualUploadCallback={this.setManualUpload} />;
    } else if (!agentCreated) {
      content = (
        <CreateAgent
          onClose={onClose}
          createAgentSuccessCallback={this.createAgentSuccessCallback}
        />
      );
    } else {
      content = (
        <AddAgent
          onClose={onClose}
          manualUpload={manualUpload === true}
          agentData={agentData}
        />
      );
    }

    return (
      <ModalOverlay closeModalFunction={onClose}>
        <StyledCard>
          <ScrollableContent>
            <Title>Add new agent</Title>
            <Content>
              {content}
            </Content>
          </ScrollableContent>
        </StyledCard>
      </ModalOverlay>
    );
  }
}

AddAgentModal.propTypes = propTypes;

export default AddAgentModal;
