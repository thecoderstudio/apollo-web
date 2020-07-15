import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import WS from 'jest-websocket-mock';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AgentListItem from '../../../src/components/agent-list/AgentListItem';
import TerminalWindow from '../../../src/components/terminal/TerminalWindow';
import { darkTheme } from '../../../src/theme';
import MobileChecker from '../../../src/util/MobileChecker';

Enzyme.configure({ adapter: new Adapter() });

function getComponentTags(connection_state) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AgentListItem agent={{
          id: "fakeid",
          name: "agentName",
          connection_state: connection_state
        }} />
      </ThemeProvider>
    </div>
  );
}

function getComponent(connection_state) {
  return renderer.create(getComponentTags(connection_state));
}

describe('agent list item', () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/shell`);
  var wrapper;

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
    wrapper = mount(getComponentTags("connected"));
  });

  afterEach(() => {
    WS.clean();
  });

  it('renders connected correctly', () => {
    const tree = getComponent("connected").toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders disconnected correctly', () => {
    const tree = getComponent("disconnected").toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('opens and closes the terminal', () => {
    wrapper.find('i').simulate('click');
    expect(wrapper.find(TerminalWindow)).toHaveLength(1);

    // Close is supposed to call a callback given by the list item.
    wrapper.find('#close-button').at(0).simulate('click');
    expect(wrapper.find(TerminalWindow)).toHaveLength(0);
  });

  it('opens terminal in new window on mobile', () => {
    const location = window.location;
    const expectedHref = `${location.protocol}//${location.host}/agent/fakeid/shell`
    global.open = jest.fn();

    const mock = jest.fn();
    mock.mockReturnValueOnce(true);
    new MobileChecker().isMobile = mock;
    wrapper.find('i').simulate('click');

    expect(global.open).toHaveBeenCalledWith(expectedHref);
  });
});
