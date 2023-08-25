import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SliceNames } from '../../constants';
import { MapType } from '../../types/state';

const initialState: MapType = {
  selectedOfferId: ''
};

export const Map = createSlice({
  name: SliceNames.Map,
  initialState,
  reducers: {
    selectOffer: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.selectedOfferId = id;
    }
  },
});

export const {selectOffer} = Map.actions;
