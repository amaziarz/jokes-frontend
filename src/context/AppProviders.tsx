import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

function AppProviders({ children }: Props) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export default AppProviders;
