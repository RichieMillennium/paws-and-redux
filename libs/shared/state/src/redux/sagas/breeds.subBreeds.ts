import {actionChannel, all, cancelled, CancelledEffect, flush, put, select, take} from 'redux-saga/effects';
import {Channel} from 'redux-saga';
import {PayloadAction} from '@reduxjs/toolkit';
import { breedsState, } from '../slices';
import { selectAllBreeds } from '../selectors';
import { IBreed, IBreedType, } from '../../types';
import { breedsAreEqual } from '../../helpers/breedHelpers';


export function* newSubBreedWatcher() {
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

export function* subBreedsQueueWatcher() {
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
