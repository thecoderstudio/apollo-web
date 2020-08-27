export const LIST_AGENTS = 'LIST_AGENTS';
import { parseSnakeCaseObj } from '../util/parser';

export function listAgents(agents) {
  return {
    type: LIST_AGENTS,
    agents: new Map(agents.map(agent => [agent.id, parseSnakeCaseObj(agent)]))
  };
}
