import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  HeaderItem,
  HeaderGroup,
  Toggle,
  TextInput,
} from '@paws-and-redux/shared-ui';
import { uiState, breedsState, selectActiveView, selectSearchTerm, TToggleState } from '@paws-and-redux/shared-state';
import HeaderTitle from './HeaderTitle';

export const AppHeader = () => {
  const activeView = useSelector(selectActiveView);
  const searchTerm: string = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleGithub = () => {
    window.open('https://github.com/RichieMillennium/paws-and-redux', '_blank')
  }

  const handleToggle = (view: TToggleState) => () => {
    dispatch(uiState.actions.setView(view));
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    dispatch(breedsState.actions.searchBreeds(event.target.value));
  };

  return (
    <Header
      title={<HeaderTitle onGithubClick={handleGithub} />}>
      <HeaderGroup className="basis-1/2 md:justify-center">
        <HeaderItem className="mx-4">
          <Toggle data-test="gallery-toggle" transparent active={activeView === 'gallery'} onClick={handleToggle('gallery')}>Gallery</Toggle>
        </HeaderItem>
        <HeaderItem className="mx-4">
          <Toggle data-test="picture-book-toggle" transparent active={activeView === 'picturebook'} onClick={handleToggle('picturebook')}>Picturebook</Toggle>
        </HeaderItem>
      </HeaderGroup>
      <HeaderGroup floatRight={true}>
        <HeaderItem>
          <TextInput
             name="input1"
             placeholder="Search"
             className="w-64 h-12 m-2"
             value={searchTerm}
             onChange={handleChangeSearch}
          />

        </HeaderItem>
      </HeaderGroup>
    </Header>
  );
};

export default AppHeader;
