import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { Formik } from 'formik';
import axios from 'axios';
import { handleHTTPResponse } from '../../actions/error';
import media from '../../util/media';
import Card from '../Card';
import Input from '../Input';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';
import ModalOverlay from '../modals/ModalOverlay';
import { downloadResponse } from '../../util/http';

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

const SwitchGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;

  &> button {
    min-width: 150px;
  }

  ${
    media.phone`
      justify-content: space-between;
      flex-direction: column-reverse;
    `
  }
`;

export default class DownloadLinpeas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.export = this.export.bind(this);
    this.setAnsi = this.setAnsi.bind(this);
    this.state = { ansi: false };
  }

  setAnsi(ansi) {
    this.setState({ ansi });
  }

  export(values, { setErrors }) {
    const { agent } = this.props;
    axios.get(
      `${process.env.APOLLO_HTTP_URL}agent/${agent.id}/action/linpeas/export`,
      {
        withCredentials: true,
        params: {
          ansi: this.state.ansi
        },
      }
    )
      .then(response => {
        downloadResponse(response);
        this.close();
      })
      .catch(error => {
        handleHTTPResponse(error.response, true, true);
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setErrors(parseHTTPErrors(error.response.data, { filename: 'filename' }));
        }
      });
  }

  close() {
    this.props.onClose();
  }

  render() {
    const { agent } = this.props;

    return (
      <ModalOverlay closeModalFunction={this.close}>
        <Container>
          <Title>Export report</Title>
          <Formik
            initialValues={{ filename: '' }}
            validateOnChange={false}
            onSubmit={this.export}>
            {({ values, errors, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <h4>Filename</h4>
                  <Input placeholder={`LinPEAS-${agent.name}.txt`} />
                </div>
                <SwitchGroup>
                  <h4>ANSI</h4>
                  <Switch onChange={this.setAnsi} checked={this.state.ansi} />
                </SwitchGroup>
                <Buttons>
                  <OutlinedButton onClick={this.close}>Cancel</OutlinedButton>
                  <Button>Export</Button>
                </Buttons>
              </Form>
            )}
          </Formik>
        </Container>
      </ModalOverlay>
    );
  }
}
