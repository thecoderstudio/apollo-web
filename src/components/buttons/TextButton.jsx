import Button from './Button';
import styled from 'styled-components';

const TextButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${props => props.theme.accent};
`;

export default TextButton