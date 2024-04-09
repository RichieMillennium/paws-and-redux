import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@paws-and-redux/shared-state';
import { GalleryView } from './paws-and-redux-gallery';

describe('PawsAndReduxGallery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Provider store={store}>
      <GalleryView />
    </Provider>);
    expect(baseElement).toBeTruthy();
  });
});
