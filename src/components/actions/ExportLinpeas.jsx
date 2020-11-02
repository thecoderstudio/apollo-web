import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { exportLinpeasSchema } from '../../validation/linpeas';
import { handleHTTPResponse } from '../../actions/error';
import { downloadResponse } from '../../util/http';
import { parseHTTPErrors } from '../../util/parser';
import media from '../../util/media';
import FormModal from '../modals/FormModal';
import Input from '../Input';

const SwitchGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export default class ExportLinpeas extends React.PureComponent {
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

  close() {
    this.props.onClose();
  }

  export(values, { setErrors }) {
    const { agent } = this.props;
    axios.get(
      `${process.env.APOLLO_HTTP_URL}agent/${agent.id}/action/linpeas/export`,
      {
        withCredentials: true,
        params: {
          ansi: this.state.ansi,
          filename: values.filename ? values.filename : null
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
        } else {
          this.close();
        }
      });
  }

  render() {
    const { agent, onClose } = this.props;

    return (
      <FormModal
        title="Export report"
        primaryActionTitle="Export"
        onClose={onClose}
        initialValues={{ filename: '' }}
        validationSchema={exportLinpeasSchema}
        onSubmit={this.export}>
          {(values, errors, handleChange) => (
            <div>
              <div>
                <h4>Filename</h4>
                <Input
                  name="filename"
                  value={values.filename}
                  error={errors.filename}
                  onChange={handleChange}
                  placeholder={`LinPEAS-${agent.name}.txt`} />
              </div>
              <SwitchGroup>
                <h4>ANSI</h4>
                <Switch onChange={this.setAnsi} checked={this.state.ansi} />
              </SwitchGroup>
            </div>
          )}
        </FormModal>
    );
  }
}
