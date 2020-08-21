import { LIST_AGENTS, listAgents } from '../../src/actions/agent';

test("list agents creates lists agents action", () => {
  const expectedAgent = { id: '1' };
  const expectedAction = {
    type: LIST_AGENTS,
    expectedAgent
  };
  expect(listAgents(expectedAgent)).toEqual(expectedAction);
});