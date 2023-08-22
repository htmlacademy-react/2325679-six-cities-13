import {createAction} from '@reduxjs/toolkit';
import { SortingType } from '../types/sorting';
import { Offer, OfferData, Offers } from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../constants';
import { UserData } from '../types/user-data';
import { Nullable } from 'vitest';
import { Review } from '../types/review';

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

export const getClickedOfferId = createAction<string>('getClickedOfferId');

export const getOfferData = createAction<OfferData>('getOfferData');

export const getOffersNearby = createAction<Offer[]>('getOffersNearby');

export const getOfferReviews = createAction<Review[]>('getOfferReviews');

export const setErrorOfferData = createAction<boolean>('setErrorOfferData');

export const postNewComment = createAction<Review>('postNewComment');
