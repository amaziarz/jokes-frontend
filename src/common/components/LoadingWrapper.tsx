import { ReactNode } from 'react';
import styled from 'styled-components';
import { Spinner } from 'common/components/styled';

interface Props {
  children: ReactNode;
  isLoading: boolean;
}

function LoadingWrapper({ children, isLoading }: Props) {
  return (
    <Wrapper>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : null}
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default LoadingWrapper;
