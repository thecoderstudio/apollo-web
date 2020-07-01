import React from 'react';
import { darkTheme } from '../../src/theme';
import { Terminal } from '../../src/components/Terminal';
import WS from 'jest-websocket-mock';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const mockAgent = {
  // Fake UUID
  id: 'a2346886-83ba-442d-9fb7-d024c6274e22',
  name: 'test'
}

describe('Terminal', () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/shell`)

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

  it('correctly handles unsuccessful connection', async () => {
    const spy = jest.spyOn(Terminal.prototype, 'write');
    const container = mount(<Terminal theme={darkTheme} agent={mockAgent} />);
    await server.connected;
    server.error();

    const chalk = container.find(Terminal).instance().chalk
    const agentName = chalk.hex(darkTheme.primary).bold(mockAgent.name);
    expect(spy).toHaveBeenCalledWith(`Connecting to agent ${agentName}...\n\r\n`);
    expect(spy).toHaveBeenCalledWith(chalk.hex(darkTheme.error).bold(
      "Something went wrong in the connection with the agent."
    ));
  });
});
