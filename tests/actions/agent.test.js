import { Map as ImmutableMap } from 'immutable';
import { PUT_AGENT, LIST_AGENTS, listAgents, putAgent } from '../../src/actions/agent';
import Agent from '../../src/records/Agent';

test("list agents creates lists agents action", () => {
  const agent = { id: '1' };
  const expectedAgents = new ImmutableMap({
    1: Agent(agent)
  });
  const expectedAction = {
    type: LIST_AGENTS,
    agents: expectedAgents
  };
  expect(listAgents([agent])).toEqual(expectedAction);
});

test("put agent creates put agent action", () => {
  const agent = { id: '1', username: 'test' };
  const expectedAction = {
    type: PUT_AGENT,
    agent: Agent(agent)
  };
  expect(putAgent(agent)).toEqual(expectedAction);
});
