import {createAction} from '@reduxjs/toolkit';
import { SortingType } from '../types/sorting';

export const changeCity = createAction<{city: string}>('changeCity');

export const getOffers = createAction('getOffers');

export const selectOffer = createAction<{id: string}>('selectOffer');

export const sortOffers = createAction<{sortingType: SortingType}>('sortOffers');
