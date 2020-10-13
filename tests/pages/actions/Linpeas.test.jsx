import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import WS from 'jest-websocket-mock';
import { mount } from 'enzyme';
import Linpeas from '../../../src/pages/actions/Linpeas';
import { darkTheme } from '../../../src/theme';

const mockStore = configureStore([]);

function getComponentTags(store) {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <Linpeas
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

describe('linpeas', () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/action/linpeas`);

  afterEach(() => {
    WS.clean();
  });

  it('correctly renders', () => {
    const agents = new Map();
    agents.set('fakeid', {
      id: 'fakeid',
      name: 'fake',
      connectionState: 'connected'
    });
    const store = mockStore({
      agent: agents
    });
    const wrapper = mount(getComponentTags(store));
    expect(wrapper).toMatchSnapshot();
  });
});
