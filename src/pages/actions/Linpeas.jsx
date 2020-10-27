import React from 'react';
import styled from 'styled-components';
import TerminalPage from '../TerminalPage';
import DownloadLinpeas from '../../components/action/DownloadLinpeas';
import Icon from '../../components/Icon';

const Fab = styled.div`
  right: 20px;
  width: 50px;
  height: 50px;
  bottom: 20px;
  background-color: red;
  z-index: 5;
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
      <div>
        <TerminalPage agentEndpoint='action/linpeas' readOnly {...this.props} />
        <Fab onClick={this.startExporting}>
          <Icon />
        </Fab>
        { this.state.exporting && <DownloadLinpeas /> }
      </div>
    );
  }
}
