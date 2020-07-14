import { LIST_AGENTS, listAgents } from '../../src/actions/agent';

test("list agents creates lists agents action", () => {
  const expectedAction = {
    type: LIST_AGENTS,
    agents: new Map()
  };
  expect(listAgents([])).toEqual(expectedAction);
});
