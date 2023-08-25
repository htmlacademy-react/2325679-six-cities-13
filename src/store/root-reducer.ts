import { combineReducers } from '@reduxjs/toolkit';
import { SliceNames } from '../constants';
import { Map } from './map/map.slice';
import { authProcess } from './auth-process/auth-process.slice';
import { offersData } from './offers-data/offers-data.slice';

export const rootReducer = combineReducers({
  [SliceNames.Auth]: authProcess.reducer,
  [SliceNames.Data]: offersData.reducer,
  [SliceNames.Map]: Map.reducer,
});
