import { ReactNode } from 'react';
import { Spinner } from 'common/components/styled';

interface Props {
  children: ReactNode;
  isLoading: boolean;
}

function LoadingWrapper({ children, isLoading }: Props) {
  return (
    <div css="position: relative;">
      {isLoading ? (
        <div
          css={`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        >
          <Spinner />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export default LoadingWrapper;
