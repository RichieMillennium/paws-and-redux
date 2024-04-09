import {
  put,
  call,
  takeLatest,
  fork,
} from 'redux-saga/effects';
import { breedsState, } from '../slices';
import { IBreed, } from '../../types';
import { fetchAllBreeds, } from '../../api/breeds';
import { breedImagesQueueWatcher } from './breeds.images';
import { subBreedsQueueWatcher } from './breeds.subBreeds';
import { ALL_COLORS } from '@paws-and-redux/shared-ui';

const TAG_COLORS = ALL_COLORS.filter(color => ![
  'primary',
  'secondary',
  'neutral',
  'transparent',
  'white'
].includes(color));

function* initBreedsSaga() {
  yield fork(breedImagesQueueWatcher);
  yield fork(subBreedsQueueWatcher);
  yield fork(fetchAllBreedsSaga);
}

export function* initBreedsWatcher() {
  yield takeLatest(breedsState.actions.initBreeds.type, initBreedsSaga);
}

function* sortBreedsSaga() {
  yield put(breedsState.actions.updateBreedsCache());
}

export function* sortBreedsWatcher() {
  yield takeLatest(breedsState.actions.sortBreeds.type, sortBreedsSaga);
}

function* fetchAllBreedsSaga() {
  const { results }: { results?: Record<string, string[]>, error?: string } = yield call(fetchAllBreeds);
  if (results) {
    const breeds = Object.entries(results)
      .map(([breed, subBreeds]) => {
        const colorIndex = Math.ceil(Math.random() * 10);
        const tagColor = TAG_COLORS[colorIndex];
        return { name: breed, subBreeds, tagColor } as IBreed;
      });
    yield put(
      breedsState.actions.fetchAllBreedsSuccess(breeds)
    );
    yield put(
      breedsState.actions.createSubBreedsStart()
    );
  } else {
    yield put(breedsState.actions.fetchAllBreedsError('Unable to fetch breeds'));
  }
}

export function* fetchAllBreedsWatcher() {
  yield takeLatest(breedsState.actions.fetchAllBreedsStart.type, fetchAllBreedsSaga);
}
