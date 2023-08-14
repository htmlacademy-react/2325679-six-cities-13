import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getOffers, loadOffers, selectOffer, sortOffers, setError, setOffersDataLoadingStatus, requireAuthorization, setUserData } from './action';
import { CITIES, DEFAULT_SORTING_TYPE, AuthorizationStatus } from '../constants';
import { Offer } from '../types/offer';
import { sortPriceUp, sortPriceDown, sortRate } from '../utils';
import { SortingType } from '../types/sorting';
import { UserData } from '../types/user-data';

type InitialState = {
  city: string;
  offers: Offer[];
  offersByCity: Offer[];
  selectedOfferId: string;
  currentSortingType: SortingType;
  error: string | null;
  isOffersDataLoading: boolean;
  authorizationStatus: string;
  userData: UserData;
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
    });
});

export { reducer };
