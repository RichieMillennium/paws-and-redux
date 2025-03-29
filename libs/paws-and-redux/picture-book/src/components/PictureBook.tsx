import {
  createRef,
  useEffect,
  useState,
  FC,
  PropsWithChildren,
  forwardRef,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedBreedImageUrls } from '@paws-and-redux/shared-state';
import DogPic from './DogPic';

const ROW_HEIGHT = 80;
const COL_WIDTH = '20rem';

const Container = forwardRef<HTMLDivElement, PropsWithChildren>( ({ children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${COL_WIDTH}, 1fr))`,
        gridTemplateRows: `calc(${ROW_HEIGHT}px - 2rem)`
      }}
      className="grid gap-8 h-1/2 overflow-auto"
    >
      {children}
    </div>
  );
});

interface ISlotProps {
  span: number;
  height: number;
}

const Slot: FC<PropsWithChildren<ISlotProps>> = ({ children, span, height }) => {
  const heightClass = height ? `h-[${height}px]` : 'h-max';
  return (
    <div className={heightClass} style={{ gridRow: `span ${span}` }}>
      {children}
    </div>
  );
};

export const PictureBook = () => {
  const [spansHeights, setSpansHeights] = useState<Array<Array<number>>>([]);
  const newRef = createRef<HTMLDivElement>();
  const parentRef = useRef(newRef.current);
  const imageUrls = useSelector(selectSelectedBreedImageUrls);

  useEffect(() => {
    const computeSpans = () => {
      setSpansHeights(previousValue => {
        const newSpans: Array<Array<number>> = [];
        if (parentRef.current) {
          Array.from(parentRef.current?.children).forEach(child => {
            const span = Math.ceil(child.scrollHeight / ROW_HEIGHT);
            newSpans.push([span + 1, span * ROW_HEIGHT]);
          });
        }
        if (
          previousValue.length &&
          previousValue.length === newSpans.length &&
          previousValue[0][0] === newSpans[0][0] &&
          previousValue[0][1] === newSpans[0][1]
        ) {
          return previousValue;
        }
        return newSpans;
      });
    };

    if (imageUrls?.length) {
      computeSpans();
    }
    window.addEventListener('resize', computeSpans);
    return () => {
      window.removeEventListener('resize', computeSpans);
    }

  }, [imageUrls]);

  return (
    <Container ref={parentRef}>
      {imageUrls?.map((imageUrl, index) => {
        const [span, height] = spansHeights[index] || [];
        return (
          <Slot key={imageUrl} span={span} height={height}>
            <DogPic url={imageUrl} />
          </Slot>
        );
      })}
    </Container>
  );
};

export default PictureBook;
