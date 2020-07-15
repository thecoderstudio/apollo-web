import React from 'react';
import { ThemeProvider } from 'styled-components';
import WS from 'jest-websocket-mock';
import { mount } from 'enzyme';
import { Rnd } from 'react-rnd';
import TerminalWindow from '../../../src/components/terminal/TerminalWindow';
import { darkTheme } from '../../../src/theme';

function getComponentTags(connection_state, onClose=jest.fn()) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <TerminalWindow
          onClose={onClose}
          agent={{
            id: "fakeid",
            name: "agentName",
            connection_state: connection_state
          }}
        />
      </ThemeProvider>
    </div>
  );
}

describe('agent list item', () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/shell`);

  beforeEach(() => {
    process.env = {
      APOLLO_WS_URL: 'ws://localhost:1234/'
    };
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    WS.clean();
  });

  it('correctly renders connected', () => {
    const wrapper = mount(getComponentTags("connected"));
    expect(wrapper).toMatchSnapshot();
  });

  it('correctly renders disconnected', () => {
    const wrapper = mount(getComponentTags("disconnected"));
    expect(wrapper).toMatchSnapshot();
  });

  it('resizes', () => {
    const wrapper = mount(getComponentTags("connected"));
    wrapper.find(Rnd).instance().props.onResize(null, null, null, null, null);
    expect(wrapper).toMatchSnapshot();
  });

  it('opens terminal in new window', () => {
    const location = window.location;
    const expectedHref = `${location.protocol}//${location.host}/agent/fakeid/shell`
    global.open = jest.fn();

    const wrapper = mount(getComponentTags("connected"));
    wrapper.find('#expand-button').at(0).simulate('click');

    expect(global.open).toHaveBeenCalledWith(expectedHref);
  });

  it('closes', () => {
    const onCloseMock = jest.fn();
    const wrapper = mount(getComponentTags("connected", onCloseMock));
    wrapper.find('#close-button').at(0).simulate('click');
    expect(onCloseMock).toHaveBeenCalled();
  });
});
