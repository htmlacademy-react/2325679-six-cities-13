import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, DEFAULT_SORTING_TYPE, SliceNames, StatusComment } from '../../constants';
import { favoritesOfferAction, fetchOfferAction, getFavoriteOffersAction, getOfferDataAction, getOfferReviewsAction, getOffersNearbyAction, postNewCommentAction } from '../api-actions';
import { OffersData } from '../../types/state';
import { OfferData } from '../../types/offer';
import { SortingType } from '../../types/sorting';

const initialState: OffersData = {
  city: CITIES[0],
  currentSortingType: DEFAULT_SORTING_TYPE,
  offers: [],
  offerData: {} as OfferData,
  errorOfferData: false,
  isOffersDataLoading: true,
  statusComment: StatusComment.Idle,
  offersNearby: [],
  offerReviews: [],
  favoriteOffers: [],
  isFavoritesLoading: false
};

export const offersData = createSlice({
  name: SliceNames.Data,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{ city: string }>) => {
      const { city } = action.payload;
      state.city = city;
    },
    sortOffers: (state, action: PayloadAction<{ sortingType: SortingType }>) => {
      const { sortingType } = action.payload;
      state.currentSortingType = sortingType;
    },
    setErrorOffer: (state) => {
      state.errorOfferData = false;
    },
    clearFavortiteOffers: (state) => {
      state.favoriteOffers = [];
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
        state.statusComment = StatusComment.Loading;
      })
      .addCase(postNewCommentAction.fulfilled, (state, action) => {
        state.statusComment = StatusComment.Success;
        state.offerReviews.push(action.payload);
      })
      .addCase(postNewCommentAction.rejected, (state) => {
        state.statusComment = StatusComment.Error;
      })
      .addCase(getFavoriteOffersAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(getFavoriteOffersAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(favoritesOfferAction.fulfilled, (state, action) => {
        if (action.meta.arg.status === 1) {
          state.favoriteOffers.push(action.payload);
          state.offers.map((offer) => {
            if (offer.id === action.payload.id) {
              offer.isFavorite = true;
            }
          });
        } else {
          state.offers.map((offer) => {
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

export const { changeCity, sortOffers, setErrorOffer, clearFavortiteOffers } = offersData.actions;
