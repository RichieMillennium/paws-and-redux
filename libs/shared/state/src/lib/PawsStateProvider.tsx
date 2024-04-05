import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export const PawsStateProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default PawsStateProvider;