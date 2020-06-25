export const LIST_AGENTS_SUCCESS = 'LIST_AGENTS_SUCCESS';

export const listAgentsSuccess = (agents) => ({
    type: LIST_AGENTS_SUCCESS,
    agents: agents
});