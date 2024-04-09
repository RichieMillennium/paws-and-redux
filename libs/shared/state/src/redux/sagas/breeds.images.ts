import {
  put,
  call,
  all,
  select,
  actionChannel,
  take,
  spawn,
  flush,
  cancelled,
  CancelledEffect,
} from 'redux-saga/effects';
import {Channel, } from 'redux-saga';
import {breedsState, galleryState} from '../slices';
import {IBreed, IBreedType} from '../../types';
import {fetchBreedImages, fetchSubBreedImages} from '../../api/breeds';
import {selectBreedsCache, selectGallerySize, selectSearchTerm, selectSelectedBreed } from '../selectors';
import {breedMatchesSearchTerm} from '../../helpers/breedHelpers';

export function* breedsNeedImagesLoadedWatcher() {
  while (true) {
    yield take([
      breedsState.actions.updateBreedsCache.type,
      breedsState.actions.searchBreeds.type,
      breedsState.actions.setSelectedBreed.type,
    ]);
    const cache: IBreed[] = yield select(selectBreedsCache);
    const searchTerm: string = yield select(selectSearchTerm);
    const selectedBreed: IBreed | null = yield select(selectSelectedBreed);

    if (selectedBreed) {
      if (selectedBreed.parentBreed) {
        yield put(breedsState.actions.queueBreedImageFetch({
          breedName: selectedBreed.parentBreed,
          subBreed: selectedBreed.name
        }));
      } else {
        yield put(breedsState.actions.queueBreedImageFetch({ breedName: selectedBreed.name }));
      }
    }

    const breedsMissingImages = cache.filter(breed => !breed.imageUrls && breedMatchesSearchTerm(breed, searchTerm));
    yield all(
      breedsMissingImages.map(breed => {
        if (breed.parentBreed) {
          return put(breedsState.actions.queueBreedImageFetch({
            breedName: breed.parentBreed,
            subBreed: breed.name
          }))
        } else {
          return put(breedsState.actions.queueBreedImageFetch({breedName: breed.name}))
        }

      })
    );
  }
}

function* imageQueueCanceller(imagesChannel: Channel<ReturnType<typeof breedsState.actions.queueBreedImageFetch>>): Generator {
  while (true) {
    yield take([
      breedsState.actions.searchBreeds.type,
      breedsState.actions.setSelectedBreed.type,
    ]);
    yield flush(imagesChannel);
    yield put(galleryState.actions.resetGallerySize());
  }
}

export function* breedImagesQueueWatcher() {
  let fetchCount = 0;
  let fetchLimit: number = yield select(selectGallerySize);
  const imagesChannel: Channel<ReturnType<typeof breedsState.actions.queueBreedImageFetch>> =
    yield actionChannel(breedsState.actions.queueBreedImageFetch.type);
  yield spawn(imageQueueCanceller, imagesChannel);
  try {
    while (true) {
      const {payload} = yield take(imagesChannel);
      const {breedName, subBreed}: IBreedType = payload;
      while (fetchCount >= fetchLimit) {
        yield take([
          galleryState.actions.fetchMoreGalleryImages.type,
          galleryState.actions.resetGallerySize.type
        ]);
        fetchLimit = yield select(selectGallerySize);
        if (fetchCount >= fetchLimit) {
          fetchCount = 0;
        }
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
    const {results}: { results: string[] } = yield call(fetchSubBreedImages, breedName, subBreed);
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
    const {results}: { results: string[] } = yield call(fetchBreedImages, breedName);
    if (results) {
      yield put(breedsState.actions.breedImagesFetchSuccess({breedName, imageUrls: results}));
    } else {
      yield put(breedsState.actions.breedImagesFetchError(`Unable to fetch images for ${breedName} breed`));
    }
  }
}


