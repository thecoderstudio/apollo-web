import styled from 'styled-components';

const Card = styled.div`
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 40px;
  border-radius: 10px;
  background-color: ${props => props.theme.lightBlack};
`;

export default Card;
