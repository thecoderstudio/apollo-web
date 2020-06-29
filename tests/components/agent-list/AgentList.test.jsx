import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from 'axios';
import AgentList from '../../../src/components/agent-list/AgentList';
import { listAgents as listAgentsAction } from '../../../src/actions/agent';

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
		// store.dispatch = jest.fn();
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
		axios.get.mockResolvedValue(Promise.resolve({
			status: 403
		}));
		getComponent(store);
		expect(window.location.pathname).toEqual("/");
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

	it("correctly lists agents", () => {
		const responseData = [
			{ id: "1", name: "test", connection_state: "connected" }
		]

		axios.get.mockResolvedValue(Promise.resolve({
			data: responseData
		}));

		const component = getComponent(store);


		expect(listAgentsAction).toHaveBeenCalledTimes(1);


		// expect(instance.props.dispatch).toHaveBeenCalledTimes(1);
		// expect(store.dispatch).toHaveBeenCalledWith(
		// 	listAgentsAction(responseData)
		// );

		// tree.props.agents = [{ id: "1", name: "test", connection_state: "connected" }]
		// console.log(component.toJSON())
		// // console.log(component.root.findByType('agentList'))
		// console.log(component.root.findByType('ul').children)
		// const instance = component.root.findAllByProps({ key: "1", agentName: "test", connectionState: "connected" });
		// });
		// console.log(instance)
		// console.log(instance.type)
	})
})
