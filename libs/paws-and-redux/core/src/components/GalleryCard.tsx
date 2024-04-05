import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  galleryState,
  EIndexChange,
  IBreed,
  selectGalleryImageIndexes,
} from '@paws-and-redux/shared-state';
import RightButtonIcon from './RightButtonIcon';
import LeftButtonIcon from './LeftButtonIcon';

interface IProps {
  breed: IBreed;
}

export const GalleryCard: FC<IProps> = ({breed}) => {
  const imageIndexMap = useSelector(selectGalleryImageIndexes);
  const dispatch = useDispatch();

  const imageIndex = imageIndexMap[`${breed.name}/${breed.parentBreed}`] || 0;

  const handleClickPrevious = () => {
    dispatch(
      galleryState.actions.changeGalleryImageIndex({
        breed: breed.name,
        parentBreed: breed.parentBreed,
        indexChange: EIndexChange.previous
      })
    );
  };

  const handleClickNext = () => {
    dispatch(
      galleryState.actions.changeGalleryImageIndex({
        breed: breed.name,
        parentBreed: breed.parentBreed,
        indexChange: EIndexChange.next
      })
    );
  };

  return (
    <div className="w-1/5 my-4 mx-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full rounded-t-lg h-64 bg-cover bg-no-repeat bg-center flex flex-col items-center justify-between px-5 py-1" style={{ backgroundImage: `url(${breed.galleryImageUrl})`}}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-secondary-100" style={{ textShadow: '2px 2px 1px black' }}>
          {breed.name}
        </h5>
        {breed.parentBreed && (
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-secondary-100" style={{ textShadow: '2px 2px 1px black' }}>
            {breed.parentBreed}
          </h5>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-evenly w-full">
          <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center">
            Browse Photos
          </span>
          <button onClick={handleClickPrevious} disabled={imageIndex === 0}
             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 disabled:bg-gray-500 rounded-lg hover:bg-blue-500 active:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <LeftButtonIcon/>
          </button>
          <button onClick={handleClickNext} disabled={imageIndex === (breed.imageUrls?.length || 0) - 1}
             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 disabled:bg-gray-500 rounded-lg hover:bg-blue-500 active:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <RightButtonIcon/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
