import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import media from '../../util/media';
import Card from '../Card';
import Input from '../Input';
import Button from '../buttons/Button';
import OutlinedButton from '../buttons/OutlinedButton';

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
  z-index: 10;
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
    this.setAnsi = this.setAnsi.bind(this);
    this.state = { ansi: false };
  }

  setAnsi(ansi) {
    this.setState({ ansi });
  }

  render() {
    return (
      <Container>
        <Form>
          <div>
            <h4>Filename</h4>
            <Input />
          </div>
          <SwitchGroup>
            <h4>ANSI</h4>
            <Switch onChange={this.setAnsi} checked={this.state.ansi} />
          </SwitchGroup>
          <Buttons>
            <OutlinedButton>Cancel</OutlinedButton>
            <Button>Export</Button>
          </Buttons>
        </Form>
      </Container>
    );
  }
}
