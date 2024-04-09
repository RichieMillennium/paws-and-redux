import { render } from '@testing-library/react';

import PawsAndReduxGallery from './paws-and-redux-gallery';

describe('PawsAndReduxGallery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PawsAndReduxGallery />);
    expect(baseElement).toBeTruthy();
  });
});
