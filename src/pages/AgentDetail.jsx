import React from 'react';
import { connect } from 'react-redux';

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

  render() {
    return <div>{this.state.agent.name}</div>
  }
}

export default connect(
  state => ({agents: state.agent})
)(AgentDetail);
