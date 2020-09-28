import { fromJS, Map as ImmutableMap } from 'immutable';
import { parseSnakeCaseObj } from '../util/parser';
import Agent from '../records/Agent';

export const LIST_AGENTS = 'LIST_AGENTS';
export const PUT_AGENT = 'PUT_AGENT';

export function listAgents(agents) {
  return {
    type: LIST_AGENTS,
    agents: new ImmutableMap(agents.map(agent => [agent.id, new Agent(parseSnakeCaseObj(agent))]))
  };
}

export function putAgent(agent) {
  return {
    type: PUT_AGENT,
    agent: new Agent(parseSnakeCaseObj(agent))
  };
}
