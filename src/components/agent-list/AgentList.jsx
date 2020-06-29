import { connect } from 'react-redux';
import axios from 'axios';
import AgentListItem from './AgentListItem'
import React from 'react';
import styled from 'styled-components'
import { logout as logoutAction } from '../../actions/auth'
import { listAgents as listAgentsAction } from '../../actions/agent';

const Content = styled.div`
  display: grid;
  grid-column: agent-listing;
	grid-template-rows: [title] 50px [list] 1fr;
	
	background-color: ${props => props.theme.lightBlack};
	border-radius: 8px;
	maring: 20px;
	padding: 20px;
	
`;

const ListTitle = styled.h2`
  grid-row: title;
`;

const List = styled.ul`
	grid-row: list;
	list-style: none;
	padding-left: 0;
`;


class AgentList extends React.Component {
	constructor(props) {
		super(props);
		this.generateAgents = this.generateAgents.bind(this);
	}

	componentDidMount() {
		this.requestAgents()
	}

	requestAgents() {
		const { dispatch } = this.props;
		axios.get(
			process.env.APOLLO_URL.concat("agent"),
			{ withCredentials: true }
		)
			.then(response => {
				dispatch(listAgentsAction(response.data));
			})
			.catch(function (error) {
				if (error.response) {
					if (error.response.status === 403) {
						dispatch(logoutAction())
					}
				}
			});
	}

	generateAgents(agents) {
		return agents.map(agent => {
			return <AgentListItem key={agent.id} agentName={agent.name} connectionState={agent.connection_state} />
		})
	}

	render() {

		return (
			<Content>
				<ListTitle>Agents</ListTitle>
				<List>
					{this.generateAgents(this.props.agents)}
				</List>
			</Content>
		)
	}
}

const mapStateToProps = (state) => ({
	agents: state.agent.agents
});

export default connect(mapStateToProps)(AgentList);