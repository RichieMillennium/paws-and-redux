import { TPawsState } from '../store';
import { NAMESPACE } from '../slices/ui';

export const selectActiveView = (state: TPawsState) =>
  state[NAMESPACE].activeView;
