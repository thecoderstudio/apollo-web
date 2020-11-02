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
  const server = new WS(`ws://localhost:1234/agent/fakeid/action/linpeas`);
  const agents = new Map();
  agents.set('fakeid', {
    id: 'fakeid',
    name: 'fake',
    connectionState: 'connected'
  });
  const store = mockStore({
    agent: agents
  });

  afterEach(() => {
    WS.clean();
  });

  it('correctly renders', async () => {
    const wrapper = mount(getComponentTags(store));
    await server.connected;
    expect(wrapper).toMatchSnapshot();
  });

  it("correctly toggles export dialog", () => {
    const wrapper = mount(getComponentTags(store));
    const instance = wrapper.find(Linpeas).childAt(0).instance()

    instance.setComplete(true);
    wrapper.update()
    expect(wrapper).toMatchSnapshot();

    wrapper.find('#export').first().simulate('click');
    wrapper.update()
    expect(wrapper).toMatchSnapshot();

    instance.stopExporting();
    wrapper.update()
    expect(wrapper).toMatchSnapshot();
  });
});
