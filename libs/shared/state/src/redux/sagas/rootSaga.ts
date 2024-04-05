import { all } from 'redux-saga/effects';
import { fetchAllBreedsWatcher, breedImagesQueueWatcher, subBreedQueueWatcher, initBreedsWatcher, sortBreedsWatcher, } from './breeds';

export function* rootSaga() {
  yield all([
    initBreedsWatcher(),
    fetchAllBreedsWatcher(),
    breedImagesQueueWatcher(),
    subBreedQueueWatcher(),
    sortBreedsWatcher(),
  ])
}
