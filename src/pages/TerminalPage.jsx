import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Terminal from '../components/terminal/Terminal';

const propTypes = {
  agentEndpoint: PropTypes.string,
  readOnly: PropTypes.bool
};

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
    return <Terminal
      ref={this.terminalRef}
      readOnly={this.props.readOnly}
      agentEndpoint={this.props.agentEndpoint}
      agent={this.props.agents.get(params.agentId)} />;
  }
}

TerminalPage.propTypes = propTypes;

export default connect(
  state => ({agents: state.agent})
)(TerminalPage);
