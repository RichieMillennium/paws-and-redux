import { render } from '@testing-library/react';

import AppCore from './app-core';

describe('AppCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppCore />);
    expect(baseElement).toBeTruthy();
  });
});
