import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TToggleState } from '../../types';

export const NAMESPACE = 'ui';

export interface IState {
  activeView: TToggleState
}

const initialState: IState = {
  activeView: 'gallery'
};

export const uiSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setView(state: IState, action: PayloadAction<TToggleState>) {
      state.activeView = action.payload;
    }
  },
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;
