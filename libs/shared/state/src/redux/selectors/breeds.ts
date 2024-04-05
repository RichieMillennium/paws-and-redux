import {createSelector } from '@reduxjs/toolkit';
import { TPawsState } from '../store';

export const selectAllBreeds = (state: TPawsState) =>
  state.breeds.breeds;

export const selectBreedsCache = (state: TPawsState) =>
  state.breeds.breedsCache;

export const selectSelectedBreed = (state: TPawsState) =>
  state.breeds.selectedBreed;

export const selectBreedsStatus = (state: TPawsState) =>
  state.breeds.status;

export const selectBreedsErrorMessage = (state: TPawsState) =>
  state.breeds.errorMessage;

export const selectGallerySize = (state: TPawsState) =>
  state.breeds.gallerySize;

export const selectGalleryImageIndexes = (state: TPawsState) =>
  state.breeds.galleryImageIndexes;

export const selectGalleryBreeds = createSelector(
  [selectAllBreeds, selectGallerySize, selectGalleryImageIndexes],
  (allBreeds, gallerySize, imageIndexes) => {
    return allBreeds
      .filter((breed, index) => index < gallerySize)
      .map(breed => ({
        ...breed,
        defaultImageUrl: breed.imageUrls?.[imageIndexes[`${breed.name}/${breed.parentBreed}`] || 0] || breed.defaultImageUrl,
      }));
  }
);
