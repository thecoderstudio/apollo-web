import React from 'react';
import { connect } from 'react-redux';
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
  bottom: 30px;
  right: 30px;
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

class Linpeas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.startExporting = this.startExporting.bind(this);
    this.stopExporting = this.stopExporting.bind(this);
    this.setComplete = this.setComplete.bind(this);
    this.state = {
      exporting: false,
      complete: false
    };
  }

  startExporting() {
    this.setState({
      exporting: true
    });
  }

  stopExporting() {
    this.setState({
      exporting: false
    });
  }

  setComplete(complete) {
    this.setState({
      complete
    });
  }

  render() {
    const { match: { params } } = this.props;
    const agent = this.props.agents.get(params.agentId);

    return (
      <Container>
        <TerminalPage 
          agentEndpoint='action/linpeas'
          onSocketClose={this.setComplete}
          readOnly {...this.props} />
        { this.state.complete && 
          <Fab onClick={this.startExporting}>
            <Icon className="fas fa-download" />
          </Fab>
        }
        { this.state.exporting && <DownloadLinpeas agent={agent} onClose={this.stopExporting} /> }
      </Container>
    );
  }
}

export default connect(
  state => ({agents: state.agent})
)(Linpeas);
