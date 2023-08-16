import {createAction} from '@reduxjs/toolkit';
import { SortingType } from '../types/sorting';
import { Offers } from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../constants';
import { UserData } from '../types/user-data';
import { Nullable } from 'vitest';

export const changeCity = createAction<{city: string}>('changeCity');

export const getOffers = createAction('getOffers');

export const selectOffer = createAction<{id: string}>('selectOffer');

export const sortOffers = createAction<{sortingType: SortingType}>('sortOffers');

export const loadOffers = createAction<Offers>('loadOffers');

export const setError = createAction<Nullable<string>>('setError');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const setUserData = createAction<UserData>('setUserData');
