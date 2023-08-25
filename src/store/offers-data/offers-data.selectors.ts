import {SliceNames} from '../../constants';
import {State} from '../../types/state';
import { Offer, OfferData } from '../../types/offer';
import { Review } from '../../types/review';
import { SortingType } from '../../types/sorting';

export const getOffers = (state: State): Offer[] => state[SliceNames.Data].offersByCity;
export const getLocation = (state: State): string => state[SliceNames.Data].city;
export const getStatusLoading = (state: State): boolean => state[SliceNames.Data].isOffersDataLoading;
export const getOffersData = (state: State): OfferData => state[SliceNames.Data].offerData;
export const getOffersNearby = (state: State): Offer[] => state[SliceNames.Data].offersNearby;
export const getErrorOfferData = (state: State): boolean => state[SliceNames.Data].errorOfferData;
export const getStatusSendingComment = (state: State): boolean => state[SliceNames.Data].isCommentSending;
//export const getSuccessfulSendedComment = (state: State): boolean => state[SliceNames.Data].isCommentSendedSuccesful;
export const getOfferReviews = (state: State): Review[] => state[SliceNames.Data].offerReviews;
export const getSortingType = (state: State): SortingType => state[SliceNames.Data].currentSortingType;
