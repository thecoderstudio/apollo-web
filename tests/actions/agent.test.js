import { LIST_AGENTS, listAgents } from '../../src/actions/agent';

test("list agents creates lists agents action", () => {
  const expectedAgents = [{ id: '1' }];
  const expectedAction = {
    type: LIST_AGENTS,
    agents: expectedAgents
  };
  expect(listAgents(expectedAgents)).toEqual(expectedAction);
});