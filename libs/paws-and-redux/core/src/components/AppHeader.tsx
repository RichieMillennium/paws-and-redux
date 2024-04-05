import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  HeaderItem,
  HeaderGroup,
  Toggle,
  TextInput,
} from '@paws-and-redux/shared-ui';
import { uiState, selectActiveView, TToggleState } from '@paws-and-redux/shared-state';
import HeaderTitle from './HeaderTitle';

export const AppHeader = () => {
  const activeView = useSelector(selectActiveView);
  const dispatch = useDispatch();

  const handleGithub = () => {
    window.open('https://github.com/RichieMillennium/paws-and-redux', '_blank')
  }

  const handleToggle = (view: TToggleState) => () => {
    dispatch(uiState.actions.setView(view));
  };

  return (
    <Header
      title={<HeaderTitle onGithubClick={handleGithub} />}>
      <HeaderGroup className="basis-1/2 md:justify-center">
        <HeaderItem className="mx-4">
          <Toggle active={activeView === 'gallery'} onClick={handleToggle('gallery')}>Gallery</Toggle>
        </HeaderItem>
        <HeaderItem className="mx-4">
          <Toggle active={activeView === 'picturebook'} onClick={handleToggle('picturebook')}>Picturebook</Toggle>
        </HeaderItem>
      </HeaderGroup>
      <HeaderGroup floatRight={true}>
        <HeaderItem>
          <TextInput
                     title="Search" name="input1"
                     placeholder="Type here"
                     className="w-64 h-12 m-2"/>

        </HeaderItem>
      </HeaderGroup>
    </Header>
  );
};

export default AppHeader;
