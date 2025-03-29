import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  galleryState,
  EIndexChange,
  IBreed,
  selectGalleryImageIndexes,
} from '@paws-and-redux/shared-state';
import { RightButtonIcon, LeftButtonIcon } from '@paws-and-redux/shared-ui';

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
    <div data-test="gallery-card" className="w-1/5 my-4 mx-8 dark:bg-gray-800 dark:border-gray-700 cursor-default">
      <div className="w-full border border-gray-200 rounded-lg h-64 bg-cover bg-no-repeat bg-center flex flex-col items-center justify-between px-5 py-1" style={{ backgroundImage: `url(${breed.galleryImageUrl})`}}>
      </div>
      <div className="p-2">
        <div className="flex justify-evenly w-full align-middle">
          <div className="w-3/4">
            <span className="font-thin">{breed.name}</span>
            {breed.parentBreed && (
              <span className="font-thin ml-1">{breed.parentBreed}</span>
            )}
          </div>
          <button onClick={handleClickPrevious} disabled={imageIndex === 0}
                  className="inline-flex items-center px-3 text-sm font-medium text-center text-gray-300 disabled:text-gray-200 rounded-lg hover:text-gray-500 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <LeftButtonIcon/>
          </button>
          <button onClick={handleClickNext} disabled={imageIndex === (breed.imageUrls?.length || 0) - 1}
                  className="inline-flex items-center px-3 text-sm font-medium text-center text-gray-300 disabled:text-gray-200 rounded-lg hover:text-gray-500 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <RightButtonIcon/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
