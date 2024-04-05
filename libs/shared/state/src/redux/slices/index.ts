import { combineReducers } from '@reduxjs/toolkit';
import breedsReducer from './breeds';
import uiReducer from './ui';

export * as breedsState from './breeds';
export * as uiState from './ui';

export const rootReducer = combineReducers({
  breeds: breedsReducer,
  ui: uiReducer,
});
