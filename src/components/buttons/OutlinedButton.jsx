import styled from 'styled-components';
import Button from './Button';

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