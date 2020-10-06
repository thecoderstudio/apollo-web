import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import Notifications from './components/notifications/Notifications';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import AgentDetail from './pages/AgentDetail';
import TerminalPage from './pages/TerminalPage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=B612:wght@400;700&family=Roboto:wght@300;400&display=swap');

  html, body {
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    font-weight: 500;
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.black};
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'B612', sans-serif;
  }
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
`;

function App(props) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Content>
            {props.authenticated && props.hasChangedPassword && <NavBar />}
            <Switch>
              <ProtectedRoute exact path="/" component={Dashboard} fallbackComponent={Welcome} />
              <ProtectedRoute exact path="/agent/:agentId/shell" component={TerminalPage} fallbackComponent={NotFound} />
              <ProtectedRoute exact path="/agent/:agentId" component={AgentDetail} fallbackComponent={NotFound} />
              <ProtectedRoute exact path="/admin" component={Admin} fallbackComponent={NotFound} role="admin" />
              <Route component={NotFound} />
            </Switch>
            <Notifications />
            <GlobalStyle />
          </Content>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default connect(
  (state) => ({
    authenticated: state.authenticated,
    hasChangedPassword: state.currentUser.hasChangedInitialPassword
  })
)(App);
