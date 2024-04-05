export interface IBreed {
  name: string;
  defaultImageUrl?: string;
  imageUrls?: string[];
  parentBreed?: string;
  subBreeds?: string[];
}

export enum EStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export type TToggleState = 'gallery' | 'picturebook';

export enum EIndexChange {
  previous = -1,
  next = 1,
}

export interface IBreedImageIndexChange {
  breed: string;
  parentBreed?: string;
  indexChange: EIndexChange;
}

export interface IBreedType {
  breedName: string;
  subBreed?: string;
}