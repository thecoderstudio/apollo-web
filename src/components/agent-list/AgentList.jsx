import AgentListItem from './AgentListItem'
import React from 'react';
import styled from 'styled-components'

const Content = styled.div`
  display: grid;
  grid-column: agent-listing;
  grid-template-rows: [title] 50px [list] 1fr;
  background-color: blue;
`;

const ListTitle = styled.h2`
  grid-row: title;
  color: ${props => props.theme.primary};
`;

const List = styled.ul`
    grid-row: list;
    background-color: green;
    list-style: none;
    padding-left: 0;
`;


export default function AgentList(props) {
    return (
        <Content>
            <ListTitle>Agents</ListTitle>
            <List>
                <AgentListItem />
            </List>
        </Content>
    )
}