import { render } from '@testing-library/react';

import PawsStateProvider from './PawsStateProvider';

describe('PawsStateProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PawsStateProvider />);
    expect(baseElement).toBeTruthy();
  });
});
