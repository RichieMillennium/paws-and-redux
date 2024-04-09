import { useSelector } from 'react-redux';
import { selectActiveView } from '@paws-and-redux/shared-state';
import { GalleryView } from '@paws-and-redux/paws-and-redux-gallery';
import { PictureBookView } from '@paws-and-redux/paws-and-redux-picture-book';

export const AppBody = () => {
  const activeView = useSelector(selectActiveView);

  return (
    <div className="container m-auto mt-4">
      {activeView === 'gallery' && <GalleryView />}
      {activeView === 'picturebook' && <PictureBookView />}
    </div>
  );
};

export default AppBody;
