import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  selectedOfferId: ''
};

export const userProcess = createSlice({
  name: NameSpace.UserProcess,
  initialState,
  reducers: {
    selectOffer: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.selectedOfferId = id;
    }
  },
});

export const {selectOffer} = userProcess.actions;
