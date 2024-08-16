import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataAvatarBase64 } from '../../models/FormDataAvatarBase64';

const initialState: FormDataAvatarBase64[] = [];

export const uncontrolledFormDataSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<FormDataAvatarBase64>) => {
      const data = action.payload;
      state.push(data);
    },
  },
});

export const { actions, reducer } = uncontrolledFormDataSlice;
