import React from 'react';
import WS from 'jest-websocket-mock';
import waitForExpect from 'wait-for-expect';
import { mount } from 'enzyme';
import { darkTheme } from '../../../src/theme';
import { Terminal, openTerminal } from '../../../src/components/terminal/Terminal';

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
    expect(termWriteSpy).toHaveBeenCalledWith(terminal.chalk.hex(darkTheme.error).bold(
      "\n\r\nConnection with server is closed"
    ));
  });

  it('correctly writes data', async () => {
    await server.connected;
    terminal.term.write("test");

    assertConnection();
    expect(server).toReceiveMessage("test");
  });

  it('throw unexpected fit errors', () => {
    terminal.fitAddon.fit = jest.fn();
    terminal.fitAddon.fit.mockImplementation(() => {
      throw new Error();
    });
    expect(() => {
      terminal.fit();
    }).toThrow();
  });

  it('correctly handles connection closure', async () => {
    await server.connected;
    server.close();

    assertConnection();
    await waitForExpect(() => {
      expect(termWriteSpy).toHaveBeenCalledWith(terminal.chalk.hex(darkTheme.error).bold(
        "\n\r\nConnection with server is closed"
      ));
    });
  });
});

test("openTerminal opens new window", () => {
  const location = window.location;
  const expectedHref = `${location.protocol}//${location.host}/agent/testid/shell`;
  global.open = jest.fn();
  openTerminal("testid");
  expect(global.open).toHaveBeenCalledWith(expectedHref);
});
