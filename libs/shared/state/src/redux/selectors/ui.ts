import { TPawsState } from '../store';

export const selectActiveView = (state: TPawsState) =>
  state.ui.activeView;
