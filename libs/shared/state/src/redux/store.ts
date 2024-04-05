import { configureStore, } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { breedsState, rootReducer } from './slices';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
  });
  sagaMiddleware.run(rootSaga);
  store.dispatch(breedsState.actions.initBreeds());
  return store;
};
export const store = createStore();
export type TPawsState = ReturnType<typeof store.getState>;
export type TPawsDispatch = typeof store.dispatch;
