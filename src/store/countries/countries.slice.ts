import { createSlice } from '@reduxjs/toolkit';
import { allowedCountries } from '../../core/schemas/schemas';

const initialState: string[] = allowedCountries;

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const { actions, reducer } = countriesSlice;
