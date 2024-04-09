import DogTags from '../components/DogTags';
import PictureBook from '../components/PictureBook';

export const PictureBookView = () => {
  return (
    <div data-test="picture-book-view">
      <DogTags />
      <PictureBook />
    </div>
  );
};

export default PictureBookView;
