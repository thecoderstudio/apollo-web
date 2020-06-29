import { LIST_AGENTS } from '../actions/agent';

const initialState = {
    agents: [],
};

export default function agentReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_AGENTS:
            return {
                ...state,
                agents: action.agents,
            };
        default: return state;
    }
}