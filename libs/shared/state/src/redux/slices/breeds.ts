import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { EStatus, IBreed, IBreedImageIndexChange, IBreedType } from '../../types';
import { setBreedImages, updateBreedsCache, sortBreeds } from '../../helpers/breedHelpers';

const GALLERY_PAGE_SIZE = 12;

export interface IState {
  status: EStatus,
  breedsCache: IBreed[];
  breeds: IBreed[];
  selectedBreed: IBreed | null;
  errorMessage: string | null;
  searchTerm: string;
  gallerySize: number;
  galleryImageIndexes: Record<string, number>;
}

const initialState: IState = {
  status: EStatus.idle,
  breedsCache: [],
  breeds: [],
  selectedBreed: null,
  errorMessage: null,
  searchTerm: '',
  gallerySize: 12,
  galleryImageIndexes: {},
};

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    initBreeds(state: IState) {
      //
    },
    fetchAllBreedsStart(state: IState) {
      state.status = EStatus.loading;
    },
    fetchAllBreedsSuccess(state: IState, action: PayloadAction<Array<IBreed>>) {
      state.breeds = [...action.payload];
      state.selectedBreed = null;
      state.status = EStatus.success;
      state.errorMessage = null;
      state.searchTerm = '';
    },
    fetchAllBreedsError(state: IState, action: PayloadAction<string>) {
      state.status = EStatus.error;
      state.errorMessage = action.payload;
    },
    fetchBreedImagesStart(state: IState) {
      //
    },
    searchBreeds(state: IState, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.breeds = state.breedsCache.filter(breed => {
        return breed.name === action.payload || breed.parentBreed === action.payload;
      });
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
    queueSubBreedAdd(state: IState, action: PayloadAction<IBreed>) {
      //
    },
    queueBreedImageFetch(state: IState, _action: PayloadAction<IBreedType>) {
      //
    },
    breedImagesFetchSuccess(state: IState, action: PayloadAction<{ breedName: string; parentBreed?: string; imageUrls: string[] }>) {
      const { breedName, parentBreed, imageUrls } = action.payload;
      state.breeds = setBreedImages(state.breeds, imageUrls, breedName, parentBreed);
    },
    breedImagesFetchError(state: IState, action: PayloadAction<string>) {
      const breed = state.breeds.find(breed => breed.name === action.payload);
      if (breed) {
        breed.imageUrls = [];
      }
    },
    fetchMoreGalleryImages(state: IState) {
      state.gallerySize += GALLERY_PAGE_SIZE;
    },
    updateBreedsCache(state: IState) {
      state.breedsCache = [...state.breeds];
    },
    setSelectedBreed(state: IState, action: PayloadAction<string>) {
      const sel = state.breeds.find(item => item.name === action.payload);
      state.selectedBreed = sel || null;
    },
    unselectBreed(state: IState) {
      state.selectedBreed = null;
    },
    changeGalleryImageIndex(state: IState, action: PayloadAction<IBreedImageIndexChange>) {
      const { breed, parentBreed, indexChange } = action.payload;
      const index = `${breed}/${parentBreed}`;
      state.galleryImageIndexes = {
        ...state.galleryImageIndexes,
        [index]: (state.galleryImageIndexes[index] || 0) + indexChange
      };
    },
  },
});

export const actions = breedsSlice.actions;
export default breedsSlice.reducer;
