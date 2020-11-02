import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import media from '../../util/media';
import OutlinedButton from '../buttons/OutlinedButton';
import Button from '../buttons/Button';
import Card from '../Card';
import ModalOverlay from './ModalOverlay';

const propTypes = {
  title: PropTypes.string.isRequired,
  primaryActionTitle: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

const defaultProps = {
  onClose: () => {}
};

const Container = styled(Card)`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-left: auto;
  margin-right: auto;
  min-height: 250px;
  width: 100%;
  max-width: 400px;
  transform: translateY(-50%);

  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;

  &> button {
    min-width: 150px;
    margin: 16px 0px;
  }

  ${
    media.phone`
      justify-content: space-between;
      flex-direction: column-reverse;
    `
  }
`;

class FormModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.onClose();
  }

  render() {
    const {
      children,
      title,
      primaryActionTitle,
      onClose,
      ...rest
    } = this.props;

    return (
      <ModalOverlay closeModalFunction={this.close}>
        <Container>
          <Title>{title}</Title>
          <Formik validateOnChange={false} {...rest}>
            {({ values, errors, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {children(values, errors, handleChange)}
                <Buttons>
                  <OutlinedButton onClick={this.close}>Cancel</OutlinedButton>
                  <Button>{primaryActionTitle}</Button>
                </Buttons>
              </Form>
            )}
          </Formik>
        </Container>
      </ModalOverlay>
    );
  }
}

FormModal.propTypes = propTypes;
FormModal.defaultProps = defaultProps;

export default FormModal;
