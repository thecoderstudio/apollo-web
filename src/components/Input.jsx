import styled from 'styled-components';

const Input = styled.input`
  background: ${props => props.theme.white};
  border: none;
  border-radius: 5px;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1rem;
  padding-left: 10px;
  opacity: 0.9;
`;

export default Input;
