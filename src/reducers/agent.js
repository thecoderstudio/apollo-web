import { LIST_AGENTS } from '../actions/agent';

const initialState = {
    agents: [],
};

export default function agentReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_AGENTS:
            console.log(
                {
                    ...state,
                    agents: action.agents,
                }
            )
            return {
                ...state,
                agents: action.agents,
            };
        default: return state;
    }
}