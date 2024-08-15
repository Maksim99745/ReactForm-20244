import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UncontrolledFormData } from '../../models/UncontrolledFormData';

const initialState: UncontrolledFormData[] = [];

export const countriesSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<UncontrolledFormData>) => {
      const data = action.payload;
      state.push(data);
    },
  },
});

export const { actions, reducer } = countriesSlice;
