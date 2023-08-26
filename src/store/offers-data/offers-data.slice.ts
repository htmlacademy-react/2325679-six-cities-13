import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, DEFAULT_SORTING_TYPE, SliceNames } from '../../constants';
import { favoritesOfferAction, fetchOfferAction, getFavoriteOffersAction, getOfferDataAction, getOfferReviewsAction, getOffersNearbyAction, postNewCommentAction } from '../api-actions';
import { OffersData } from '../../types/state';
import { OfferData } from '../../types/offer';
import { SortingType } from '../../types/sorting';
import { sortPriceUp, sortPriceDown, sortRate } from '../../utils';

const initialState: OffersData = {
  city: CITIES[0],
  currentSortingType: DEFAULT_SORTING_TYPE,
  offers: [],
  offersByCity: [],
  offerData: {} as OfferData,
  errorOfferData: false,
  isOffersDataLoading: true,
  isCommentSending: false,
  offersNearby: [],
  offerReviews: [],
  favoriteOffers: []
};

export const offersData = createSlice({
  name: SliceNames.Data,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{ city: string }>) => {
      const { city } = action.payload;
      state.city = city;
    },
    getOffers: (state) => {
      state.offersByCity = state.offers.filter((offer) => (
        offer.city.name === state.city
      ));
    },
    sortOffers: (state, action: PayloadAction<{ sortingType: SortingType }>) => {
      const { sortingType } = action.payload;
      state.currentSortingType = sortingType;
      switch (sortingType) {
        case 'priceRaise': state.offersByCity = state.offersByCity.sort(sortPriceUp); break;
        case 'priceFall': state.offersByCity = state.offersByCity.sort(sortPriceDown); break;
        case 'top': state.offersByCity = state.offersByCity.sort(sortRate); break;
        default: state.offersByCity = state.offers.filter((offer) => (
          offer.city.name === state.city
        )); break;
      }
    },
    setErrorOffer: (state) => {
      state.errorOfferData = false;
    },
    setFavortiteOffers: (state) => {
      state.offersByCity.map((offer) => offer.isFavorite === false);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.errorOfferData = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
        state.offersByCity = action.payload.filter((offer) => (
          offer.city.name === CITIES[0]
        ));
        state.errorOfferData = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.errorOfferData = true;
      })
      .addCase(getOfferDataAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.errorOfferData = false;
      })
      .addCase(getOfferDataAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offerData = action.payload;
        state.errorOfferData = false;
      })
      .addCase(getOfferDataAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.errorOfferData = true;
      })
      .addCase(getOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.errorOfferData = false;
      })
      .addCase(getOfferReviewsAction.fulfilled, (state, action) => {
        state.offerReviews = action.payload;
        state.errorOfferData = false;
      })
      .addCase(postNewCommentAction.pending, (state) => {
        state.isCommentSending = true;
      })
      .addCase(postNewCommentAction.fulfilled, (state, action) => {
        state.isCommentSending = false;
        state.offerReviews.push(action.payload);
      })
      .addCase(postNewCommentAction.rejected, (state) => {
        state.isCommentSending = false;
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(favoritesOfferAction.fulfilled, (state, action) => {
        if (action.meta.arg.status === 1) {
          state.favoriteOffers.push(action.payload);
          state.offersByCity.map((offer) => {
            if (offer.id === action.payload.id) {
              offer.isFavorite = true;
            }
          });
        } else {
          state.offersByCity.map((offer) => {
            if (offer.id === action.payload.id) {
              offer.isFavorite = false;
            }
          });
          const index = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
          state.favoriteOffers.splice(index, 1);
        }
      });
  }
});

export const { changeCity, getOffers, sortOffers, setErrorOffer, setFavortiteOffers } = offersData.actions;
