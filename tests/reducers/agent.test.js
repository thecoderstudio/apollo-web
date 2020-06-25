import agentReducer from '../../src/reducers/agent';
import LIST_AGENTS, { LIST_AGENTS_SUCCESS } from '../../src/actions/agent'

describe("agent reducer", () => {
    it("should return empty agent list as initial state", () => {
        expect(agentReducer(undefined, {})).toEqual({ "agents": [] })
    });

    it("should correctly handle agent listing", () => {
        state = { "agents": [{ id="id" }] }
        expect(agentReducer(state, { type: LIST_AGENTS })).toEqual(state)
    })
})