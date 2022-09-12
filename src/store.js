import { configureStore, combineReducers } from '@reduxjs/toolkit';

import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
  login: loginReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
