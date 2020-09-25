import { Map as ImmutableMap } from 'immutable';
import { LIST_AGENTS, listAgents } from '../../src/actions/agent';
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
