import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import WS from 'jest-websocket-mock';
import { mount } from 'enzyme';
import AgentListItem from '../../../src/components/agent-list/AgentListItem';
import TerminalWindow from '../../../src/components/terminal/TerminalWindow';
import { darkTheme } from '../../../src/theme';
import MobileChecker from '../../../src/util/MobileChecker';


function getComponentTags(connectionState, operatingSystem) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AgentListItem agent={{
          id: "fakeid",
          name: "agentName",
          architecture: "amd64",
          connectionState,
          operatingSystem
        }} />
      </ThemeProvider>
    </div>
  );
}

function getComponent(connectionState, operatingSystem) {
  ReactDOM.createPortal = node => node
  return renderer.create(getComponentTags(connectionState, operatingSystem));
}

describe('agent list item', () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/shell`);
  var wrapper;

  beforeEach(() => {
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
    wrapper.find({ className: "fas fa-terminal" }).simulate('click')
    expect(wrapper).toMatchSnapshot();

    // Close is supposed to call a callback given by the list item.
    wrapper.find('#close-button').at(0).simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it("doesn't open the terminal if not connected", () => {
    const component = getComponent('connected');
    let tree = component.toJSON();
    component.update(getComponentTags('disconnected'));
    tree = component.toJSON();
    component.root.findByProps({ className: "fas fa-terminal" }).props.onClick();
    expect(tree).toMatchSnapshot();
  });

  it('opens terminal in new window on mobile', () => {
    const location = window.location;
    const expectedHref = `${location.protocol}//${location.host}/agent/fakeid/shell`;
    global.open = jest.fn();

    const mock = jest.fn();
    mock.mockReturnValueOnce(true);
    new MobileChecker().isMobile = mock;
    wrapper.find({ className: "fas fa-terminal" }).simulate('click');

    expect(global.open).toHaveBeenCalledWith(expectedHref);
  });

  it('renders the various operating systems correctly', () => {
    let tree;
    const component = getComponent('connected');
    let operatingSystems = ['darwin', 'openbsd', 'freebsd', 'linux', null];
    for (const os of operatingSystems) {
      component.update(getComponentTags('connected', os));
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    }
  });
});
