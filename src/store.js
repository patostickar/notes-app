import { configureStore, combineReducers } from '@reduxjs/toolkit';

import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
