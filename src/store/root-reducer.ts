import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { userProcess } from './user-process/user-process.slice';
import { authProcess } from './auth-process/auth-process.slice';
import { offersData } from './offers-data/offers-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: authProcess.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.UserProcess]: userProcess.reducer,
});
