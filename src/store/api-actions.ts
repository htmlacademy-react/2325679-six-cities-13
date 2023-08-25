import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, AppRoute } from '../constants.js';
import { Offer, OfferData, Offers } from '../types/offer.js';
import { redirectToRoute } from './action.js';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Comment, Review } from '../types/review.js';


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<UserData, Partial<AuthData>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async (param, { dispatch, extra: api }) => {
    const isCheckAuth = Object.keys(param).length === 0;
    const { data } = !isCheckAuth
      ? await api.post<UserData>(APIRoute.Login, param)
      : await api.get<UserData>(APIRoute.Login);
    const { token } = data;
    saveToken(token);
    if (!isCheckAuth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchOfferAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);


export const getOfferDataAction = createAsyncThunk<OfferData, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOfferData',
  async (clickedOfferId, { extra: api }) => {
    const { data } = await api.get<OfferData>(`${APIRoute.Offers}/${clickedOfferId}`);
    return data;
  },
);

export const getOffersNearbyAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOffersNearby',
  async (clickedOfferId, { extra: api }) => {
    const response = await api.get<Offer[]>(`${APIRoute.Offers}/${clickedOfferId}/nearby`);
    const { data } = response;
    return data;
  },
);

export const getOfferReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOfferReviews',
  async (clickedOfferId, { extra: api }) => {
    const response = await api.get<Review[]>(`/comments/${clickedOfferId}`);
    const { data } = response;
    return data;
  },
);


export const postNewCommentAction = createAsyncThunk<Review, Comment & {callback: () => void}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postNewComment',
  async (param, { extra: api }) => {
    const { offerId, rating, comment, callback } = param;
    const response = await api.post<Review>(`/comment/${offerId}`, { rating, comment });
    if (response.status === 201) {
      callback();
    }

    const { data } = response;
    return data;
  },
  );
