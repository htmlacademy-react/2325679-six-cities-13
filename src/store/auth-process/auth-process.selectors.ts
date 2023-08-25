import { SliceNames } from '../../constants';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';


export const getAuthorizationStatus = (state: State): string => state[SliceNames.Auth].authorizationStatus;
export const getUserData = (state: State): UserData => state[SliceNames.Auth].userData;
