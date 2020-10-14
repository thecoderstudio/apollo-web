import React from 'react';
import TerminalPage from '../TerminalPage';

export default function Linpeas(props) {
  return (
    <TerminalPage agentEndpoint='action/linpeas' readOnly {...props} />
  );
}
