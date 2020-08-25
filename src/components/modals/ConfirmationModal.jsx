import React from 'react';
import Modal from './modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OutlinedButton from '../buttons/OutlinedButton';
import Button from '../buttons/Button';
import { browserPreferredTheme } from '../../theme';

const propTypes = {
  title: PropTypes.string.isRequired,
  confirmationCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired,
  confirmationButtonColor: PropTypes.string,
  confirmationButtonText: PropTypes.string
};

const defaultProps = {
  confimationButtonColor: browserPreferredTheme.primary,
  confirmationButtonText: 'confirm'
}

const Content = styled.div`
  display: grid;
  grid-template-columns: [cancel] 1fr [delete] 1fr;
`;

const CancelButton = styled(OutlinedButton)`
  margin: 20px;
  grid-column: cancel;
`;

const ConfirmButton = styled(Button)`
  grid-column: delete;
  margin: 20px;
  background-color: ${props => props.color}
`;

export default function ConfirmationModal(props) {
  return(
    <Modal visible={true} title={props.title}>
      <Content>
        <CancelButton onClick={props.cancelCallback}>cancel</CancelButton>
        <ConfirmButton color={props.confirmationButtonColor} onClick={props.confirmationCallback}>{props.confirmationButtonText}</ConfirmButton>
      </Content>
    </Modal>
  );
}

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;