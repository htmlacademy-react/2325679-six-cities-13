import {createAction} from '@reduxjs/toolkit';
import { SortingType } from '../types/sorting';
import { Offers } from '../types/offer';

export const changeCity = createAction<{city: string}>('changeCity');

export const getOffers = createAction('getOffers');

export const selectOffer = createAction<{id: string}>('selectOffer');

export const sortOffers = createAction<{sortingType: SortingType}>('sortOffers');

export const loadOffers = createAction<Offers>('loadOffers');

export const setError = createAction<string | null>('setError');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
