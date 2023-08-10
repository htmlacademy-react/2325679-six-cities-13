import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { changeCity, getOffers, selectOffer, sortOffers } from './action';
import { CITIES, DEFAULT_SORTING_TYPE } from '../constants';
import { Offer } from '../types/offer';
import { sortPriceUp, sortPriceDown, sortRate } from '../utils';
import { SortingType } from '../types/sorting';

type InitialState = {
  city: string;
  offers: Offer[];
  offersByCity: Offer[];
  selectedOfferId: string;
  currentSortingType: SortingType;
};

const initialState : InitialState = {
  city: CITIES[0],
  offers: offers,
  offersByCity: offers.filter((offer) => (
    offer.city.name === CITIES[0]
  )),
  selectedOfferId:'',
  currentSortingType: DEFAULT_SORTING_TYPE
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
    });
});

export { reducer };
