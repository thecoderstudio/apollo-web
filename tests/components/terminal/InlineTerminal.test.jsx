import React from 'react';
import { ThemeProvider } from 'styled-components';
import WS from 'jest-websocket-mock';
import { mount } from 'enzyme';
import { darkTheme } from '../../../src/theme';
import InlineTerminal from '../../../src/components/terminal/InlineTerminal';

function getComponentTags(connectionState) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <InlineTerminal
          agent={{
            id: "fakeid",
            name: "agentName",
            connectionState
          }} />
      </ThemeProvider>
    </div>
  );
}


describe("inline terminal", () => {
  const server = new WS(`ws://localhost:1234/agent/a2346886-83ba-442d-9fb7-d024c6274e22/shell`);

  afterEach(() => {
    WS.clean();
  });

  it("correctly renders connected", () => {
    const wrapper = mount(getComponentTags("connected"));
    expect(wrapper).toMatchSnapshot();

    wrapper.find('button').at(0).simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it("correctly renders disconnected", () => {
    const wrapper = mount(getComponentTags("disconnected"));
    expect(wrapper).toMatchSnapshot();
  });

  it("correctly renders connecting", () => {
    const wrapper = mount(getComponentTags("connecting"));
    expect(wrapper).toMatchSnapshot();
  });

  it("disconnects", () => {
    const wrapper = mount(getComponentTags("connected"));
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('i').at(0).simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
