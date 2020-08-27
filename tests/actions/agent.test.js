import { LIST_AGENTS, listAgents } from '../../src/actions/agent';

test("list agents creates lists agents action", () => {
  const agent = { id: '1' };
  let expectedAgents = new Map();
  expectedAgents.set(agent.id, agent);
  const expectedAction = {
    type: LIST_AGENTS,
    agents: expectedAgents
  };
  expect(listAgents([agent])).toEqual(expectedAction);
});
