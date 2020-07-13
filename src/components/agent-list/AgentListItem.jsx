import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text';
import ConnectionState from './ConnectionState';
import TerminalWindow from '../terminal/TerminalWindow';
import media from '../../util/media';

const propTypes = {
  agent: PropTypes.object.isRequired
};

const Container = styled.li`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  border-radius: 8px;
	border: 1px solid white;

  height: 30px;
	line-height: 30px;
	padding: 15px 30px;
  margin-top: 25px;

	${
    media.phone`
      grid-template-rows: [name] 1fr [connection-status] 1fr; 
      grid-template-columns: [name-and-status] 1fr; 
      height: 100px;
    `
  }
`;

const StyledText = styled(Text)`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  

	${
    media.phone`
      grid-rows: name; 
      grid-column: name-and-status;
    `
  }
`;

const Icon = styled.i`
  &:active{
      text-shadow: 2px 2px rgba(0,0,0,0.1);
  }
`;

const TerminalIcon = styled(Icon)`

`;

export default class AgentListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openTerminal = this.openTerminal.bind(this);
    this.state = {terminalOpen: false};
  }

  openTerminal() {
    this.setState({terminalOpen: true});
  }

  render() {
    let terminal;
    if (this.state.terminalOpen) {
      terminal = <TerminalWindow agent={this.props.agent} />
    }

    return (
      <Container>
        <StyledText>{this.props.agent.name}</StyledText>
          <ConnectionState connectionState={this.props.agent.connection_state} />
          <Icon onClick={this.openTerminal} className="fas fa-terminal" />
          {terminal}
      </Container>
    );
  }
}

AgentListItem.propTypes = propTypes;
