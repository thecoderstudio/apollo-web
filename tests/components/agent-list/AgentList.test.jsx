import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import AgentList from '../../../src/components/agent-list/AgentList';
// import * as AgentActions from '../../../src/actions/agent';
import { listAgents } from '../../../src/actions/agent'
import { connect } from 'react-redux'


const mockStore = configureStore([]);
jest.mock('axios');


function getComponent(store) {
	return renderer.create(
		<Provider store={store}>
			<AgentList />
		</Provider>
	)
}

describe('agentList', () => {
	let store;
	beforeEach(() => {
		store = mockStore({
			authenticated: true,
			agent: {
				agents: []
			}
		});
		process.env = {
			APOLLO_URL: 'http://localhost:1234'
		};
		store.dispatch = jest.fn();
	});

	it("renders correctly", () => {
		axios.get.mockResolvedValue(Promise.resolve({
			status: 200,
			data: []
		}));
		const tree = getComponent(store).toJSON();
		expect(tree).toMatchSnapshot()
	})

	it("handles unauthenticated successful", () => {
		axios.get.mockResolvedValue(Promise.reject({
			response: {
				status: 403
			}
		}));
		const component = getComponent(mockStore({ authenticated: false, agent: { agents: [] } }));
		console.log(component.root.findByProps({ authenticated: false, agents: [] }))
		// const tree = getComponent(store).toJSON();
		// expect(tree).toMatchSnapshot()
	})

	it("handles unexpected error correctly", () => {
		axios.get.mockResolvedValue(Promise.reject({
			response: {
				status: 400
			}
		}));
		const component = getComponent(store);
		const tree = getComponent(store).toJSON();
		expect(tree).toMatchSnapshot()
	})

	it("correctly lists multiple agents", () => {
		store = mockStore({
			authenticated: true,
			agent: {
				agents: [
					{ id: "id", name: "name", connection_state: "connected" },
					{ id: "id2", name: "name", connection_state: "connected" },
				]
			}
		})
		const component = getComponent(store)
		expect(component.root.findAllByType("li").length).toBe(2);
	})

	// it("correctly lists agents", () => {
	// 	let a = false;

	// 	jest.mock('../../../src/actions/agent', () => ({ listAgents: jest.fn() }))

	// 	const responseData = [
	// 		{ id: "1", name: "test", connection_state: "connected" }
	// 	]
	// 	axios.get.mockResolvedValue(Promise.resolve({
	// 		data: responseData
	// 	}));

	// 	expect(store.dispatch).toHaveBeenCalled();

	// })
})
