import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import Icon from '../components/Icon';
import InlineTerminal from '../components/terminal/InlineTerminal';
import { openTerminal } from '../components/terminal/Terminal';
import ConnectionIndicator from '../components/connection-state/ConnectionIndicator';
import { getFontAwesomeClass } from '../util/agent';
import { parseSnakeCaseObj } from '../util/parser';
import { handleHTTPResponse } from '../actions/error';
import media from '../util/media';

const UNKNOWN = "unknown";

const Wrapper = styled.div`
  margin: 32px;
`;

const Agent = styled.div`
  display: grid;
  grid-template-columns: [detail] 1fr [controls] 1fr;
  max-width: 100%;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
`;

const Details = styled.div`
  grid-column: detail;
`;

const Detail = styled.td`
  padding-right: 40px;
`;

const Controls = styled.div`
  grid-column: controls;
  width: 100%;
  min-width: 0;
`;

const Terminal = styled(InlineTerminal)`
  width: 100%;

  ${
    media.phone`
      display: none;
    `
  }
`;

const OSIcon = styled(Icon)`
  margin-right: 10px;
  color: ${props => props.theme.white};
  cursor: inherit;
`;

const TerminalIcon = styled(Icon)`
  margin-top: 16px;
  width: 24px;
  height: 24px;
  color: ${props => props.active ? props.theme.primary: props.theme.inactive};
  display: none;

  ${
    media.phone`
      display: block;
    `
  }
`;

class AgentDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getAgent = this.getAgent.bind(this);
    this.openTerminal = this.openTerminal.bind(this);

    const { match: { params } } = this.props;
    this.state = {
      agent: this.props.agents.get(params.agentId)
    };
    this.getAgent(params.agentId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.agents !== this.props.agents) {
      const { match: { params } } = this.props;
      this.setState({
        agent: this.props.agents.get(params.agentId)
      });
    }
  }

  getAgent(agentID) {
    axios.get(
      `${process.env.APOLLO_HTTP_URL}agent/${agentID}`,
      { withCredentials: true }
    )
    .then(res => {
      this.setState({
        agent: parseSnakeCaseObj(res.data)
      });
    })
    .catch(error => {
      handleHTTPResponse(error.response);
    });
  }

  getOSIcon(os) {
    return os ? <OSIcon className={getFontAwesomeClass(os)} /> : null;
  }

  openTerminal() {
    if (this.state.agent.connectionState !== 'connected') {
      return;
    }
    openTerminal(this.state.agent.id);
  }

  render() {
    let agent = this.state.agent;
    const connected = agent.connectionState === 'connected';
    return (
      <Wrapper>
        <Agent>
          <Details>
            <Name>
              <ConnectionIndicator connectionState={agent.connectionState} />
              <h1>{agent.name}</h1>
            </Name>
            <table>
              <tbody>
                <tr>
                  <Detail><b>External IP address</b></Detail>
                  <Detail>{agent.externalIpAddress || UNKNOWN}</Detail>
                </tr>
                <tr>
                  <Detail><b>Operating system</b></Detail>
                  <Detail>{this.getOSIcon(agent.operatingSystem)}{agent.operatingSystem || UNKNOWN}</Detail>
                </tr>
                <tr>
                  <Detail><b>Architecture</b></Detail>
                  <Detail>{agent.architecture || UNKNOWN}</Detail>
                </tr>
              </tbody>
            </table>
            <TerminalIcon active={connected} onClick={this.openTerminal} className="fas fa-terminal" />
          </Details>
          <Controls>
            <Terminal agent={this.state.agent} />
          </Controls>
        </Agent>
      </Wrapper>
    );
  }
}

export default connect(
  state => ({agents: state.agent})
)(AgentDetail);
