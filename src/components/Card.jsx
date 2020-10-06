import styled from 'styled-components';

const Card = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 40px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.lightBlack};
`;

export default Card;
