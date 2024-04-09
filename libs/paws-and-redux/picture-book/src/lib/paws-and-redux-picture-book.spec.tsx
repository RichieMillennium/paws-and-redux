import { render } from '@testing-library/react';

import PawsAndReduxPictureBook from './paws-and-redux-picture-book';

describe('PawsAndReduxPictureBook', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PawsAndReduxPictureBook />);
    expect(baseElement).toBeTruthy();
  });
});
