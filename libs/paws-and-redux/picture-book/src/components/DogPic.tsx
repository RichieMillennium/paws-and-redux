import { FC } from 'react';

interface IProps {
  url: string;
}

export const DogPic: FC<IProps> = ({ url }) => {
  return (
    <div>
      <img className="h-auto max-w-full rounded-lg"
           src={url} alt="Dog Pic" />
    </div>
  );
};

export default DogPic;
