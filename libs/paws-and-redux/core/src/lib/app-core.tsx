import { memo } from 'react';
import AppHeader from '../components/AppHeader';
import AppBody from '../components/AppBody';

export const AppCore = memo(() => {
  return (
    <>
      <AppHeader />
      <AppBody />
    </>
  );
});

export default AppCore;
