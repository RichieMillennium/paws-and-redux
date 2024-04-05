import { combineReducers } from '@reduxjs/toolkit';
import breedsReducer, { NAMESPACE as BREEDS_NAME } from './breeds';
import uiReducer, { NAMESPACE as UI_NAME } from './ui';
import galleryReducer, { NAMESPACE as GALLERY_NAME } from './breeds.gallery';

export * as breedsState from './breeds';
export * as uiState from './ui';
export * as galleryState from './breeds.gallery';

export const rootReducer = combineReducers({
  [BREEDS_NAME]: breedsReducer,
  [UI_NAME]: uiReducer,
  [GALLERY_NAME]: galleryReducer,
});
