import React from 'react';
import { connect } from 'react-redux';
import Terminal from '../components/terminal/Terminal';

class TerminalPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.terminalRef = React.createRef();
  }

  componentDidMount() {
    this.terminalRef.current.fit();
  }

  render() {
    const { match: { params } } = this.props;
    return <Terminal ref={this.terminalRef} agent={this.props.agents.get(params.agentId)} />;
  }
}

export default connect(
  state => ({agents: state.agent})
)(TerminalPage);
