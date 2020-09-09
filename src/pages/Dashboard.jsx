import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AgentList from '../components/agent-list/AgentList';
import media from '../util/media';
import NavBar from '../components/NavBar';
import ChangePassword from '../components/user/ChangePassword';
import { fetchCurrentUser } from '../util/user';

const StyledAgentList = styled(AgentList)`
  grid-column: agent-listing;
`;

const Content = styled.div`
  grid-template-columns: [agent-listing] 1fr 1fr;
  grid-template-rows: 1fr;

  display: grid;
  grid-row: 2;
  margin: 25px;

  ${
    media.phone`
      grid-template-columns: [agent-listing] 1fr;
    `
  }
`;

const PasswordChange = styled(ChangePassword)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 2;
`;

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    fetchCurrentUser(this.props.dispatch);
    this.state = { initial_passcode_changed : this.props.currentUser.has_changed_initial_password };
  }

  render() {
    return (
      <div>
        <Content>
          <AgentList />
        </Content>
        { (!this.state.initial_passcode_changed && !this.props.promptedPasswordChange) &&
          <PasswordChange />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.currentUser,
    promptedPasswordChange: state.promptedPasswordChange
  })
)(Dashboard);
