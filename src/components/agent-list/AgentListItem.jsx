import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text';
import ConnectionState from './ConnectionState';
import { openTerminal } from '../terminal/Terminal';
import TerminalWindow from '../terminal/TerminalWindow';
import MobileChecker from '../../util/MobileChecker';
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
      flex-direction: column;
      height: auto;
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
        text-align: center;
        width: 100%;
      `
    }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  

	${
    media.phone`
      width: 100%;
    `
  }
`;

const Icon = styled.i`
  cursor: ${props => props.active ? 'pointer' : 'inherit'};
`;

const TerminalIcon = styled(Icon)`
  color: ${props => props.active ? props.theme.white : props.theme.inactive};
`;

export default class AgentListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openTerminal = this.openTerminal.bind(this);
    this.createTerminal = this.createTerminal.bind(this);
    this.closeTerminal = this.closeTerminal.bind(this);
    this.state = {terminalOpen: false};
  }

  openTerminal() {
    if (new MobileChecker().isMobile ){
      openTerminal(this.props.agent.id);
      return;
    }
    this.setState({terminalOpen: true});
  }

  createTerminal() {
      return <TerminalWindow agent={this.props.agent} onClose={this.closeTerminal} />;
  }

  closeTerminal() {
    this.setState({terminalOpen: false});
  }

  render() {
    const connected = this.props.agent.connection_state == 'connected';
    let terminal;
    if (this.state.terminalOpen) {
      terminal = this.createTerminal();
    }

    return (
      <Container>
        <StyledText>{this.props.agent.name}</StyledText>
          <Controls>
            <ConnectionState connectionState={this.props.agent.connection_state} />
            <TerminalIcon active={connected} onClick={this.openTerminal} className="fas fa-terminal" />
          </Controls>
          {terminal}
      </Container>
    );
  }
}

AgentListItem.propTypes = propTypes;
