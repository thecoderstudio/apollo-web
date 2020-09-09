import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OutlinedButton from '../buttons/OutlinedButton';
import Button from '../buttons/Button';
import { browserPreferredTheme } from '../../theme';
import Card from '../Card';
import ModalOverlay from '../modals/ModalOverlay';

const propTypes = {
  title: PropTypes.string.isRequired,
  confirmationCallback: PropTypes.func.isRequired,
  closeModalFunction: PropTypes.func.isRequired,
  confirmationButtonColor: PropTypes.string,
  confirmationButtonText: PropTypes.string
};

const defaultProps = {
  confimationButtonColor: browserPreferredTheme.primary,
  confirmationButtonText: 'Confirm'
};

const Content = styled.div`
  display: grid;
  grid-template-columns: [cancel] 1fr [confirm] 1fr;
`;

const CancelButton = styled(OutlinedButton)`
  margin: 20px;
  grid-column: cancel;
`;

const ConfirmButton = styled(Button)`
  grid-column: confirm;
  margin: 20px;
  background-color: ${props => props.color}
`;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: [title] 1fr [content] 1.5fr;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  max-width: 400px;
  background-color: ${props => props.theme.black}
`;

const Title = styled.h2`
  grid-row: title;
  width: 75%;
  margin: 0 auto;
  text-align: center;
`;

const ContentWrapper = styled.div`
  grid-row: content;
  padding-top: 20px;
`;

export default function ConfirmationModal(props) {
  return(
    <ModalOverlay title={props.title} closeModalFunction={props.closeModalFunction}>
      <StyledCard>
        <Title>{props.title}</Title>
        <ContentWrapper>
          <Content>
            <CancelButton onClick={props.closeModalFunction}>Cancel</CancelButton>
            <ConfirmButton color={props.confirmationButtonColor} onClick={props.confirmationCallback}>{props.confirmationButtonText}</ConfirmButton>
          </Content>
        </ContentWrapper>
      </StyledCard>
    </ModalOverlay>
  );
}

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;