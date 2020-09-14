import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import ConnectionState from './ConnectionState';
import { openTerminal } from '../terminal/Terminal';
import TerminalWindow from '../terminal/TerminalWindow';
import MobileChecker from '../../util/MobileChecker';
import media from '../../util/media';

const propTypes = {
  agent: PropTypes.object.isRequired
};

const Container = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 175px;
  align-content: center;

  border-radius: 8px;
  border: 1px solid white;

  height: 30px;
  line-height: 30px;
  padding: 15px 30px;
  margin-top: 25px;

  ${
    media.phone`
      display: flex;
      flex-direction: column;
      height: auto;
    `
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${
    media.phone`
      width: 100%;
    `
  }
`;

const StyledText = styled.p`
  width: 50%;
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

const IPAddress = styled.p`
  width: 50%;

  ${
    media.phone`
      width: 100%;
      text-align: center;
    `
  }
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
    this.state = {
      connected: props.agent.connectionState === 'connected',
      terminalOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.agent.connectionState === prevProps.agent.connectionState) {
      return;
    }

    this.setState({
      connected: this.props.agent.connectionState === 'connected',
    });
  }

  openTerminal() {
    if(!this.state.connected) {
      return;
    }

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
    console.log(this.props.agent)
    let terminal;
    if (this.state.terminalOpen) {
      terminal = this.createTerminal();
    }

    return (
      <Container>
        <StyledText>{this.props.agent.name}</StyledText>
        <IPAddress>{this.props.agent.externalIpAddress}</IPAddress>
        <Controls>
          <ConnectionState connectionState={this.props.agent.connectionState} />
          <TerminalIcon active={this.state.connected} onClick={this.openTerminal} className="fas fa-terminal" />
        </Controls>
        {terminal}
    </Container>
    );
  }
}

AgentListItem.propTypes = propTypes;
