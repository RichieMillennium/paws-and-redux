import {useRef, useState, useEffect, UIEvent} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {IBreed, selectAllBreeds, breedsState, selectSelectedBreed} from '@paws-and-redux/shared-state';
import {TagButton, RightButtonIcon, LeftButtonIcon} from '@paws-and-redux/shared-ui';

export const DogTags = () => {
  const tagRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const breeds = useSelector(selectAllBreeds);
  const selectedBreed = useSelector(selectSelectedBreed);
  const dispatch = useDispatch();

  const leftDisabled = currentIndex === 0;
  const rightDisabled = currentIndex === breeds.length - 1;

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex === 0) {
        return prevIndex;
      }
      return prevIndex - 1;
    })
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex === breeds.length - 1) {
        return prevIndex;
      }
      return prevIndex + 1;
    })
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    tagRefs.current[currentIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }, [currentIndex]);

  useEffect(() => {
      setCurrentIndex(() => {
        const index = breeds.findIndex(item => {
          return item.parentBreed === selectedBreed?.parentBreed && item.name === selectedBreed?.name;
        });
        if (index === -1) {
          return 0;
        }
        return index;
      });
  }, [breeds, selectedBreed]);

  const handleTagClick = (breed: IBreed) => () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    dispatch(
      breedsState.actions.setSelectedBreed(breed)
    );
  };
  return (
    <div data-test="dog-tags" className="m-auto flex w-128">
      <button className="text-gray-300 disabled:text-gray-200 hover:text-gray-500" disabled={leftDisabled} onClick={handlePrev}><LeftButtonIcon /></button>
      <div className="xs:bg-red-100 sm:bg-orange-100 md:bg-gray-100 w-56 m-8 px-8 flex h-20 overflow-x-hidden overscroll-none bg-gray-100 border rounded-b-lg border-gray-300" onScroll={handleScroll}>
        {breeds.map((breed, index) => {
          return (
            <TagButton
              key={`${breed.name}-${breed.parentBreed}`}
              color={breed.tagColor}
              onClick={handleTagClick(breed)}
              ref={el => {
                tagRefs.current[index] = el;
              }}
            >
              {breed.name} {breed.parentBreed}
            </TagButton>
          )
        })}
      </div>
      <button className="text-gray-300 disabled:text-gray-200 hover:text-gray-500" disabled={rightDisabled} onClick={handleNext}><RightButtonIcon /></button>
    </div>
  );
};

export default DogTags;
