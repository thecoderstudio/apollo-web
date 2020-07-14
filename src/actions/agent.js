export const LIST_AGENTS = 'LIST_AGENTS';

export function listAgents(agents) {
  return {
    type: LIST_AGENTS,
    agents: new Map(agents.map(agent => [agent.id, agent]))
  };
}
