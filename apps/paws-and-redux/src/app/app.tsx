import { PawsStateProvider } from '@paws-and-redux/shared-state';
import { AppCore } from '@paws-and-redux/paws-and-redux-core';

export function App() {
  return (
    <PawsStateProvider>
      <AppCore />
    </PawsStateProvider>
  );
}

export default App;
