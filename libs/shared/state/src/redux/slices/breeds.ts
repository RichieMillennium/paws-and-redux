import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { EStatus, IBreed, IBreedType } from '../../types';
import { setBreedImages, sortBreeds, findBreedIndex } from '../../helpers/breedHelpers';
import { breedMatchesSearchTerm } from '../../helpers/breedHelpers';

export const NAMESPACE = 'breeds';

export interface IState {
  status: EStatus,
  breedsCache: IBreed[];
  breeds: IBreed[];
  selectedBreed: IBreed | null;
  selectedBreedImageUrls?: string[];
  errorMessage: string | null;
  searchTerm: string;
}

const initialState: IState = {
  status: EStatus.idle,
  breedsCache: [],
  breeds: [],
  selectedBreed: null,
  errorMessage: null,
  searchTerm: '',
};

export const breedsSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    initBreeds() {
      //
    },
    fetchAllBreedsStart(state: IState) {
      state.status = EStatus.loading;
    },
    fetchAllBreedsSuccess(state: IState, action: PayloadAction<Array<IBreed>>) {
      state.breeds = [...action.payload];
      state.selectedBreed = null;
      state.selectedBreedImageUrls = [];
      state.status = EStatus.success;
      state.errorMessage = null;
      state.searchTerm = '';
    },
    fetchAllBreedsError(state: IState, action: PayloadAction<string>) {
      state.status = EStatus.error;
      state.errorMessage = action.payload;
    },
    fetchBreedImagesStart() {
      //
    },
    searchBreeds(state: IState, action: PayloadAction<string>) {
      state.searchTerm = action.payload.toLowerCase();
      state.breeds = state.breedsCache
        .filter(breed => breedMatchesSearchTerm(breed, state.searchTerm));
    },
    addBreed(state: IState, action: PayloadAction<IBreed>) {
      state.breeds = [...state.breeds, action.payload];
    },
    sortBreeds(state: IState) {
      state.breeds = sortBreeds(state.breeds);
    },
    createSubBreedsStart() {
      //
    },
    queueSubBreedAdd(_state: IState, _action: PayloadAction<IBreed>) {
      //
    },
    queueBreedImageFetch(_state: IState, _action: PayloadAction<IBreedType>) {
      //
    },
    breedImagesFetchSuccess(state: IState, action: PayloadAction<{ breedName: string; parentBreed?: string; imageUrls: string[] }>) {
      const { breedName, parentBreed, imageUrls } = action.payload;
      state.breeds = setBreedImages(state.breeds, imageUrls, breedName, parentBreed);
      state.breedsCache = setBreedImages(state.breedsCache, imageUrls, breedName, parentBreed);
      if (state.selectedBreed?.name === breedName && state.selectedBreed?.parentBreed === parentBreed) {
        const selectedIndex = findBreedIndex(state.breeds, breedName, parentBreed);
        if (selectedIndex !== -1) {
          state.selectedBreedImageUrls = state.breeds[selectedIndex].imageUrls;
        }
      }
    },
    breedImagesFetchError(state: IState, action: PayloadAction<string>) {
      const breed = state.breeds.find(breed => breed.name === action.payload);
      if (breed) {
        breed.imageUrls = [];
      }
    },
    updateBreedsCache(state: IState) {
      state.breedsCache = [...state.breeds];
    },
    setSelectedBreed(state: IState, action: PayloadAction<IBreed | null>) {
      state.selectedBreed = action.payload;
      state.selectedBreedImageUrls = state.selectedBreed?.imageUrls;
    },
    unselectBreed(state: IState) {
      state.selectedBreed = null;
      state.selectedBreedImageUrls = [];
    },
  },
});

export const actions = breedsSlice.actions;
export default breedsSlice.reducer;
