import React from 'react';
import styled from 'styled-components';
import TerminalPage from '../TerminalPage';
import DownloadLinpeas from '../../components/action/DownloadLinpeas';
import Icon from '../../components/Icon';

const Container = styled.div`
  height: 100%;
`;

const Fab = styled.div`
  position: absolute;
  width: 55px;
  height: 55px;
  bottom: 50px;
  right: 50px;
  background-color: ${props => props.theme.primary};
  border-radius: 50%;
  z-index: 5;
  display: flex;
  align-items: center;
  cursor: pointer;

  * {
    margin: 0 auto;
  }
`;

export default class Linpeas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.startExporting = this.startExporting.bind(this);
    this.state = {
      exporting: false
    };
  }

  startExporting() {
    this.setState({
      exporting: true
    });
  }

  render() {
    return (
      <Container>
        <TerminalPage agentEndpoint='action/linpeas' readOnly {...this.props} />
        <Fab onClick={this.startExporting}>
          <Icon className="fas fa-download" />
        </Fab>
        { this.state.exporting && <DownloadLinpeas /> }
      </Container>
    );
  }
}
