import {createAction} from '@reduxjs/toolkit';
//import { LocationsList } from '../types/location';

export const changeCity = createAction<{city: string}>('changeCity');

export const getOffers = createAction('getOffers');

export const selectOffer = createAction<{id: string}>('selectOffer');
