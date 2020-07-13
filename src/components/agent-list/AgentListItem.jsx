import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text';
import ConnectionState from './ConnectionState';
import Terminal from '../Terminal';
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

const StyledTerminal = styled(Terminal)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`


export default class AgentListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openTerminal = this.openTerminal.bind(this);
  }

  openTerminal() {
  }

  render() {
    return (
      <Container>
        <StyledText>{this.props.agent.name}</StyledText>
          <ConnectionState connectionState={this.props.agent.connection_state} />
          <Icon onClick={this.openTerminal} className="fas fa-terminal" />
          <StyledTerminal agent={this.props.agent} />
      </Container>
    );
  }
}

AgentListItem.propTypes = propTypes;
