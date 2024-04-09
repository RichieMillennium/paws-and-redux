import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@paws-and-redux/shared-state';

import AppCore from './app-core';

describe('@paws-and-redux/paws-and-redux-core', () => {
  it('should render AppCore successfully', () => {
    const { baseElement } = render(<Provider store={store}>
      <AppCore />
    </Provider>);
    expect(baseElement).toBeTruthy();
  });
});
