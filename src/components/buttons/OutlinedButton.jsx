import Button from './Button';
import styled from 'styled-components';

const OutlinedButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${props => props.theme.accent};


  &:focus{
    outline: none;
  }

  &:active {
    opacity: 0.80;
  }
`;

export default OutlinedButton;