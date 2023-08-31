import {SliceNames} from '../../constants';
import {State} from '../../types/state';
import { Offer, OfferData } from '../../types/offer';
import { Review } from '../../types/review';
import { SortingType } from '../../types/sorting';
import { createSelector } from '@reduxjs/toolkit';
import { sortOffers } from '../../utils';

export const getAllOffers = (state: State): Offer[] => state[SliceNames.Data].offers;
export const getLocation = (state: State): string => state[SliceNames.Data].city;
export const getFilteredOffers = createSelector([getAllOffers, getLocation], (offers, location) => offers.slice().filter((offer) => (
  offer.city.name === location)));
export const getSortingType = (state: State): SortingType => state[SliceNames.Data].currentSortingType;
export const getSortedOffers = createSelector([getFilteredOffers, getSortingType], (offers, sortingType) => sortOffers(offers, sortingType));
export const getStatusLoading = (state: State): boolean => state[SliceNames.Data].isOffersDataLoading;
export const getOffersData = (state: State): OfferData => state[SliceNames.Data].offerData;
export const getOffersNearby = (state: State): Offer[] => state[SliceNames.Data].offersNearby;
export const getErrorOfferData = (state: State): boolean => state[SliceNames.Data].errorOfferData;
export const getStatusComment = (state: State): string => state[SliceNames.Data].statusComment;
export const getOfferReviews = (state: State): Review[] => state[SliceNames.Data].offerReviews;
export const getFavoritesOffers = (state: State): (Offer)[] => state[SliceNames.Data].favoriteOffers;
export const getFavoritesStatusLoading = (state: State): boolean => state[SliceNames.Data].isFavoritesLoading;
