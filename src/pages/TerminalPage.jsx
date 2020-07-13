import React from 'react';
import { connect } from 'react-redux';
import Terminal from '../components/terminal/Terminal';

function TerminalPage(props) {
  console.log(props.agents);
  return <Terminal agent={
    props.agents[props.match.params.agentId]
  } />
}

export default connect(
  state => ({agents: state.agent})
)(TerminalPage);
