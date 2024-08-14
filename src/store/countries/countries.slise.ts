import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = ['USA', 'Poland', 'Italy'];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const { actions, reducer } = countriesSlice;
