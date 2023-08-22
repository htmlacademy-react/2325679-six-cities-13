import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getOffers, loadOffers, selectOffer, sortOffers, setError, setOffersDataLoadingStatus, requireAuthorization, setUserData, getOfferData, getOffersNearby, setErrorOfferData, getOfferReviews, postNewComment } from './action';
import { CITIES, DEFAULT_SORTING_TYPE, AuthorizationStatus } from '../constants';
import { Offer, OfferData } from '../types/offer';
import { sortPriceUp, sortPriceDown, sortRate } from '../utils';
import { SortingType } from '../types/sorting';
import { UserData } from '../types/user-data';
import { Nullable } from 'vitest';
import { Review } from '../types/review';

type InitialState = {
  city: string;
  offers: Offer[];
  offersByCity: Offer[];
  selectedOfferId: string;
  currentSortingType: SortingType;
  error: Nullable<string>;
  isOffersDataLoading: boolean;
  authorizationStatus: string;
  userData: UserData;
  clickedOfferId: string;
  offerData: OfferData;
  offersNearby: Offer[];
  errorOfferData: boolean;
  offerReviews: Review[];
};

const initialState : InitialState = {
  city: CITIES[0],
  offers: [],
  offersByCity: [],
  selectedOfferId: '',
  currentSortingType: DEFAULT_SORTING_TYPE,
  error: null,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
  clickedOfferId: '',
  offerData: {} as OfferData,
  offersNearby: [],
  errorOfferData: false,
  offerReviews: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
    })
    .addCase(getOffers, (state) => {
      state.offersByCity = state.offers.filter((offer) => (
        offer.city.name === state.city
      ));
    })
    .addCase(selectOffer, (state, action) => {
      const {id} = action.payload;
      state.selectedOfferId = id;
    })
    .addCase(sortOffers, (state, action) => {
      const {sortingType} = action.payload;
      state.currentSortingType = sortingType;
      switch (sortingType) {
        case 'priceRaise': state.offersByCity = state.offersByCity.sort(sortPriceUp); break;
        case 'priceFall': state.offersByCity = state.offersByCity.sort(sortPriceDown); break;
        case 'top': state.offersByCity = state.offersByCity.sort(sortRate); break;
        default: state.offersByCity = state.offers.filter((offer) => (
          offer.city.name === state.city
        )); break;
      }
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.offersByCity = action.payload.filter((offer) => (
        offer.city.name === CITIES[0]
      ));
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(getOfferData, (state, action) => {
      state.offerData = action.payload;
    })
    .addCase(getOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(getOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(setErrorOfferData, (state, action) => {
      state.errorOfferData = action.payload;
    })
    .addCase(postNewComment, (state, action) => {
      state.offerReviews.push(action.payload);
    });
});

export { reducer };
