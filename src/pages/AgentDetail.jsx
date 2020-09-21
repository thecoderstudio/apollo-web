import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from '../components/Icon';
import InlineTerminal from '../components/terminal/InlineTerminal';
import AgentActions from '../components/AgentActions';
import { getFontAwesomeClass } from '../util/agent';

const UNKNOWN = "unknown";

const Wrapper = styled.div`
  margin: 32px;
`;

const Agent = styled.div`
  display: grid;
  grid-template-columns: [detail] 1fr [controls] 1fr;
  max-width: 100%;
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
`;

const Terminal = styled(InlineTerminal)`
  width: 100%;
  height: 400px;
`;

const OSIcon = styled(Icon)`
  margin-right: 10px;
  color: ${props => props.theme.white};
  cursor: inherit;
`;

const Actions = styled(AgentActions)`
  margin-top: 150px;
`;

class AgentDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      agent: this.props.agents.get(params.agentId)
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.agents !== this.props.agents) {
      const { match: { params } } = this.props;
      this.setState({
        agent: this.props.agents.get(params.agentId)
      });
    }
  }

  getOSIcon(os) {
    return os ? <OSIcon className={getFontAwesomeClass(os)} /> : null;
  }

  render() {
    let agent = this.state.agent;
    return (
      <Wrapper>
        <Agent>
          <Details>
            <h1>{agent.name}</h1>
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
          </Details>
          <Controls>
            <Terminal agent={this.state.agent} />
          </Controls>
        </Agent>
        <Actions agent={this.state.agent} />
      </Wrapper>
    );
  }
}

export default connect(
  state => ({agents: state.agent})
)(AgentDetail);
