import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as controlledFormReducer } from './controlledForm/controlledForm.slice';
import { reducer as countriesReducer } from './countries/countries.slice';
import { reducer as uncontrolledFormReducer } from './uncontrolledForm/uncontrolledForm.slice';

const reducers = combineReducers({
  countries: countriesReducer,
  uncontrolledForm: uncontrolledFormReducer,
  controlledForm: controlledFormReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
