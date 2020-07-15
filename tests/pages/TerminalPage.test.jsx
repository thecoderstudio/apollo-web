import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import WS from 'jest-websocket-mock';
import { mount } from 'enzyme';
import TerminalPage from '../../src/pages/TerminalPage';
import { darkTheme } from '../../src/theme';

const mockStore = configureStore([]);

function getComponentTags(store) {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <TerminalPage
            match={{
              params: {
                agentId: "fakeid"
              }
            }}
          />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

describe('agent list item', () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/shell`);

  afterEach(() => {
    WS.clean();
  });

  it('correctly renders', () => {
    const agents = new Map();
    agents.set('fakeid', {
      id: 'fakeid',
      name: 'fake',
      connection_state: 'connected'
    });
    const store = mockStore({
      agent: agents
    });
    const wrapper = mount(getComponentTags(store));
    expect(wrapper).toMatchSnapshot();
  });
});
