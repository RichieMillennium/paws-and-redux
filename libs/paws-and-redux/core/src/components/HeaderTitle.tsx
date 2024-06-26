import { FC } from 'react';
import { Button } from '@paws-and-redux/shared-ui';

interface IHeaderTitle {
  onGithubClick: () => void;
}

export const HeaderTitle: FC<IHeaderTitle> = ({ onGithubClick }) => {
  return (
    <div className="flex items-center">
      <Button
        slim={true}
        transparent={true}
        onClick={onGithubClick}>
        GitHub
        <svg
          className="fill-current float-left mt-0.5 mr-1"
          viewBox="0 0 24 24"
          width="24"
          height="24">
          <path
            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
        </svg>
      </Button>
      <h1 className="text-2xl font-extrabold">
        Paws and Reflect (Redux)
      </h1>
    </div>
  );
};

export default HeaderTitle;
