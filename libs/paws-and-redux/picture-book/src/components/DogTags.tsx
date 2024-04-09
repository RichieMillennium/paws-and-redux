import { useSelector, useDispatch } from 'react-redux';
import {IBreed, selectAllBreeds, breedsState } from '@paws-and-redux/shared-state';
import { TagButton } from '@paws-and-redux/shared-ui';

export const DogTags = () => {
  const breeds = useSelector(selectAllBreeds);
  const dispatch = useDispatch();

  const handleTagClick = (breed: IBreed) => () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    dispatch(
      breedsState.actions.setSelectedBreed(breed)
    );
  };
  return (
    <div data-test="dog-tags" className="sticky top-[6.5rem] xs:top-[12rem] sm:top-[8.5rem] md:top-[6.5rem] xs:bg-red-100 sm:bg-orange-100 md:bg-green-100 flex flex-wrap justify-center place-content-start h-40 overflow-auto bg-gray-100 my-8 border rounded-b-lg border-gray-300">
      {breeds.map(breed => {
        return (
          <TagButton key={`${breed.name}-${breed.parentBreed}`} color={breed.tagColor} onClick={handleTagClick(breed)}>
            {breed.name} {breed.parentBreed}
          </TagButton>
        )
      })}
    </div>
  );
};

export default DogTags;
