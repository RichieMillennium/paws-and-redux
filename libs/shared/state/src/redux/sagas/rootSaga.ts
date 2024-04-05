import { all } from 'redux-saga/effects';
import { fetchAllBreedsWatcher, initBreedsWatcher, sortBreedsWatcher, } from './breeds';
import { breedsNeedImagesLoadedWatcher, } from './breeds.images';
import { newSubBreedWatcher, } from './breeds.subBreeds';

export function* rootSaga() {
  yield all([
    initBreedsWatcher(),
    fetchAllBreedsWatcher(),
    breedsNeedImagesLoadedWatcher(),
    newSubBreedWatcher(),
    sortBreedsWatcher(),
  ])
}
