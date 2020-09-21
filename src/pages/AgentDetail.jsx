import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Card from '../components/Card';
import Terminal from '../components/terminal/Terminal';
import Icon from '../components/Icon';
import { getFontAwesomeClass } from '../util/agent';

const UNKNOWN = "unknown";

const Container = styled.div`
  display: grid;
  grid-template-columns: [detail] 2fr [controls] 1fr;
  margin: 75px;
`;

const Detail = styled.div`
  grid-column: detail;
`;

const Controls = styled.div`
  grid-column: controls;
`;

const StyledCard = styled(Card)`
  width: 100%;
  height: 300px;
`;

const OSIcon = styled(Icon)`
  margin-right: 10px;
  color: ${props => props.theme.white};
  cursor: inherit;
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
      <Container>
        <Detail>
          <h1>{agent.name}</h1>
          <table>
            <tr>
              <td><b>External IP address</b></td>
              <td>{agent.externalIpAddress || UNKNOWN}</td>
            </tr>
            <tr>
              <td><b>Operating system</b></td>
              <td>{this.getOSIcon(agent.operatingSystem)}{agent.operatingSystem || UNKNOWN}</td>
            </tr>
            <tr>
              <td><b>Architecture</b></td>
              <td>{agent.architecture || UNKNOWN}</td>
            </tr>
          </table>
        </Detail>
        <Controls>
          <StyledCard>
            <Terminal agent={agent} />
          </StyledCard>
        </Controls>
      </Container>
    );
  }
}

export default connect(
  state => ({agents: state.agent})
)(AgentDetail);
