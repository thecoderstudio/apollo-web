import React from 'react';
import WS from 'jest-websocket-mock';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { darkTheme } from '../../../src/theme';
import { Terminal } from '../../../src/components/terminal/Terminal';

Enzyme.configure({ adapter: new Adapter() });

const mockAgent = {
  // Fake UUID
  id: 'a2346886-83ba-442d-9fb7-d024c6274e22',
  name: 'test'
};

describe('Terminal', () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/shell`);
  var terminal;
  var termWriteSpy;

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
    termWriteSpy = jest.spyOn(Terminal.prototype, 'write');
    terminal = mount(<Terminal theme={darkTheme} agent={mockAgent} />).find(Terminal).instance();
  });

  afterEach(() => {
    WS.clean();
  });

  const assertConnection = () => {
    const agentName = terminal.chalk.hex(darkTheme.primary).bold(mockAgent.name);
    expect(termWriteSpy).toHaveBeenCalledWith(`Connecting to agent ${agentName}...\n\r\n`);
  };

  it('correctly handles unsuccessful connection', async () => {
    await server.connected;
    server.error();

    assertConnection();
    expect(termWriteSpy).toHaveBeenCalledWith(terminal.chalk.hex(darkTheme.error).bold(
      "Something went wrong in the connection with the agent."
    ));
  });

  it('correctly writes data', async () => {
    await server.connected;
    terminal.term.write("test");

    assertConnection();
    expect(server).toReceiveMessage("test");
  });
});
