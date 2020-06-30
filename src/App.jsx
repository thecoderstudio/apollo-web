import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=B612:wght@400;700&family=Roboto:wght@300;400&display=swap');

  html, body {
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.black}; 
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
  display: grid;
  grid-template-rows: [nav] 50px 1fr;
  grid-row-gap: 8px;
`;

function App(props) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Content>
            <Switch>
              <ProtectedRoute exact path='/' component={Dashboard} fallbackComponent={Login} />
            </Switch>
            <GlobalStyle />
          </Content>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default connect()(App);
