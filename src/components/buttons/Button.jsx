import styled from 'styled-components';

const Button = styled.button`
  padding: 12px;
  border: none;
  background-color: ${props => props.theme.accent};
  border-radius: 5px;
  color: white;
  font-family: 'B612', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.90;
  }
`;

export default Button;
