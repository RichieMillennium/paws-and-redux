import {
  put,
  call,
  all,
  select,
  takeLatest,
  actionChannel,
  fork,
  take,
  flush,
  delay,
  cancelled,
  CancelledEffect,
} from 'redux-saga/effects';
import { Channel } from 'redux-saga';
import { breedsState } from '../slices';
import { IBreed, IBreedType } from '../../types';
import { fetchAllBreeds, fetchBreedImages, fetchSubBreedImages } from '../../api/breeds';
import {selectAllBreeds, selectBreedsCache, selectGallerySize} from '../selectors';
import {PayloadAction} from '@reduxjs/toolkit';
import { breedsAreEqual } from '../../helpers/breedHelpers';

function* initBreedsSaga() {
  yield fork(fetchBreedImagesWatcher);
  yield fork(fetchSubBreedsWatcher);
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
    const breeds = Object.entries(results).map(([breed, subBreeds]) => ({ name: breed, subBreeds } as IBreed));
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

export function* breedImagesQueueWatcher() {
  while (true) {
    yield take([
      breedsState.actions.updateBreedsCache.type
    ]);
    const cache: IBreed[] = yield select(selectBreedsCache);
    const breedsMissingImages = cache.filter(breed => !breed.imageUrls);
    yield all(
      breedsMissingImages.map(breed => {
        if (breed.parentBreed) {
          return put(breedsState.actions.queueBreedImageFetch({
            breedName: breed.parentBreed,
            subBreed: breed.name
          }))
        } else {
          return put(breedsState.actions.queueBreedImageFetch({ breedName: breed.name }))
        }

      })
    );
  }
}

export function* subBreedQueueWatcher() {
  while (true) {
    yield take([
      breedsState.actions.createSubBreedsStart.type
    ]);
    const primaryBreeds: IBreed[] = yield select(selectAllBreeds);
    const subBreedsToAdd = primaryBreeds.flatMap(breed => {
      return breed.subBreeds?.map(subBreed => ({
        breedName: breed.name,
        subBreed
      } as IBreedType)) || [];
    }).filter(newBreed => !primaryBreeds.find(breedsAreEqual({
      name: newBreed.subBreed || '',
      parentBreed: newBreed.breedName
    }))).map(breedDetails => ({
      name: breedDetails.subBreed || '',
      parentBreed: breedDetails.breedName,
      subBreeds: []
    }) as IBreed);
    if (subBreedsToAdd.length) {
      yield all(
        subBreedsToAdd.map(breedToAdd => put(breedsState.actions.queueSubBreedAdd(breedToAdd)))
      );
      const isLastBreedToAdd = breedsAreEqual(subBreedsToAdd[subBreedsToAdd.length - 1]);
      while (true) {
        const { payload }: PayloadAction<IBreed> = yield take(breedsState.actions.addBreed);
        if (isLastBreedToAdd(payload)) {
          yield put(breedsState.actions.sortBreeds());
        }
      }
    }
  }
}

export function* fetchSubBreedsWatcher() {
  const subBreedsChannel: Channel<ReturnType<typeof breedsState.actions.queueSubBreedAdd>> =
    yield actionChannel(breedsState.actions.queueSubBreedAdd.type);
  try {
    while (true) {
      const { payload }: PayloadAction<IBreed> = yield take(subBreedsChannel);
      yield put(breedsState.actions.addBreed(payload));
    }
  } finally {
    if ((yield cancelled()) as CancelledEffect) {
      yield flush(subBreedsChannel);
    }
  }
}

function* fetchBreedImagesWatcher() {
  let fetchCount = 0;
  let fetchLimit: number = yield select(selectGallerySize);
  const imagesChannel: Channel<ReturnType<typeof breedsState.actions.queueBreedImageFetch>> =
    yield actionChannel(breedsState.actions.queueBreedImageFetch.type);
  try {
    while (true) {
      const { payload } = yield take(imagesChannel);
      const { breedName, subBreed }: IBreedType = payload;
      while (fetchCount >= fetchLimit) {
        yield take(breedsState.actions.fetchMoreGalleryImages.type);
        fetchLimit = yield select(selectGallerySize);
      }
      yield call(fetchBreedImagesSaga, breedName, subBreed);
      fetchCount++;
    }
  } finally {
    if ((yield cancelled()) as CancelledEffect) {
      yield flush(imagesChannel);
    }
  }
}

function* fetchBreedImagesSaga(breedName: string, subBreed?: string) {
  if (subBreed) {
    const { results }: { results: string[] } = yield call(fetchSubBreedImages, breedName, subBreed);
    if (results) {
      yield put(breedsState.actions.breedImagesFetchSuccess({
        breedName: subBreed,
        parentBreed: breedName,
        imageUrls: results
      }));
    } else {
      yield put(breedsState.actions.breedImagesFetchError(`Unable to fetch images for ${breedName} ${subBreed} breed`));
    }
  } else {
    const { results }: { results: string[] } = yield call(fetchBreedImages, breedName);
    if (results) {
      yield put(breedsState.actions.breedImagesFetchSuccess({ breedName, imageUrls: results }));
    } else {
      yield put(breedsState.actions.breedImagesFetchError(`Unable to fetch images for ${breedName} breed`));
    }
  }
}
