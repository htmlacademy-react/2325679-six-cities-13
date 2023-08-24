import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import { Offer, OfferData } from '../../types/offer';
import { Review } from '../../types/review';
import { SortingType } from '../../types/sorting';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offersByCity;
export const getLocation = (state: State): string => state[NameSpace.Data].city;
export const getStatusLoading = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getOffersData = (state: State): OfferData => state[NameSpace.Data].offerData;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Data].offersNearby;
export const getErrorOfferData = (state: State): boolean => state[NameSpace.Data].errorOfferData;
export const getErrorOfferReview = (state: State): boolean => state[NameSpace.Data].errorOfferReview;
export const getOfferReviews = (state: State): Review[] => state[NameSpace.Data].offerReviews;
export const getSortingType = (state: State): SortingType => state[NameSpace.Data].currentSortingType;
