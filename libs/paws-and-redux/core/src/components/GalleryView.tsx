import { useSelector, useDispatch } from 'react-redux';
import { selectGalleryBreeds, selectBreedsStatus, EStatus, breedsState } from '@paws-and-redux/shared-state';
import GalleryCard from './GalleryCard';
import ViewMoreButton from './ViewMoreButton';

export const GalleryView = () => {
  const breeds = useSelector(selectGalleryBreeds);
  const status = useSelector(selectBreedsStatus);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(breedsState.actions.fetchMoreGalleryImages());
  };

  if (status === EStatus.loading) {
    return (<div>Loading...</div>);
  }
  return (
    <div className="flex flex-wrap">
      {breeds.map(breed => (
        <GalleryCard key={`${breed.name}-${breed.parentBreed}`} breed={breed} />
      ))}
    <ViewMoreButton onClick={handleLoadMore} />
    </div>
  );
};

export default GalleryView;
