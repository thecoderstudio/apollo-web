import React from 'react';
import styled from 'styled-components';
import ModalOverlay from '../modals/ModalOverlay';
import DescriptionButton from '../buttons/DescriptionButton';
import Card from '../Card';
import NewAgentHandler from "../../lib/NewAgentHandler";
import PropTypes from 'prop-types';
import media from '../../util/media';
import AddAgent from '../add-agent/AddAgent';

const propTypes = {
  onClose: PropTypes.func.isRequired
};

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: [title] 50px [content] 1fr;
  position: fixed;
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

class AddAgentModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.newAgentHandler = new NewAgentHandler();
    this.state = {
      manual: null,
    };
  }

  setManualUpload = (value) => {
    this.setState({ manual: value })
  }

  renderQuestion = () => {
    const directly = "Directly on target machine.";
    const manual = "Manual upload";
    return (
      <TwoColumnGrid>
        <ColumnOne>
          <StyledDescriptionButton id='directlyButton' onClick={() => this.setManualUpload(false)} title={directly}>
          You have the correct permissions to download the binary directly on the target machine.
          </StyledDescriptionButton>
        </ColumnOne>
        <ColumnTwo>
          <StyledDescriptionButton id='manualButton' onClick={() => this.setManualUpload(true)} title={manual}>
            You download and upload the binary yourself.
          </StyledDescriptionButton>
        </ColumnTwo>
      </TwoColumnGrid>
    );
  }

  render = () => {
    let content;
    if (this.state.manual == null) {
     content = this.renderQuestion();
    } else {
      content = <AddAgent onClose={this.props.onClose} manualUpload={this.state.manual == true} />
    }
    return (
      <ModalOverlay closeModalFunction={this.props.onClose}>
        <StyledCard>
          <Title>Add new agent</Title>
          <Content>
            {content}
          </Content>
        </StyledCard>
      </ModalOverlay>
    );
  }
}

AddAgentModal.propTypes = propTypes;

export default AddAgentModal;