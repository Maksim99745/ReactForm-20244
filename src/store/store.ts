import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as countriesReducer } from './countries/countries.slise';

const reducers = combineReducers({
  countries: countriesReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
