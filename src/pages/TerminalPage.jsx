import React from 'react';
import { connect } from 'react-redux';
import Terminal from '../components/terminal/Terminal';

function TerminalPage(props) {
  console.log(props.agents);
  console.log(typeof props.match.params.agentId)
  console.log(props.agents[props.match.params.agentId])
  return <Terminal agent={
    props.agents[props.match.params.agentId]
  } />
}

export default connect(
  state => ({agents: state.agent})
)(TerminalPage);
