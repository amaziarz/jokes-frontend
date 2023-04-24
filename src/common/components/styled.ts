import styled, { css, keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

export const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;
Spinner.defaultProps = {
  size: 40,
  'aria-label': 'loading',
};

export const Paragraph = styled.p<{ textAlign?: string }>`
  font-size: 1rem;
  margin: 1rem 0;
  ${(props) =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `}
`;
