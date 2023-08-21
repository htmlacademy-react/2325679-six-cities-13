import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, TIMEOUT_SHOW_ERROR, AuthorizationStatus, AppRoute } from '../constants.js';
import { Offer, OfferData, Offers } from '../types/offer.js';
import { loadOffers, setError, setOffersDataLoadingStatus, requireAuthorization, redirectToRoute, setUserData, getOfferData, getOffersNearby, setErrorOfferData, getOfferReviews, postNewComment } from './action.js';
import { store } from './';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Comment, Review } from '../types/review.js';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, Partial<AuthData>, {
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
    try {
      const { token } = data;
      saveToken(token);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      if (!isCheckAuth) {
        dispatch(redirectToRoute(AppRoute.Main));
      }
    } catch (_) {
      //смотрите обработку в функции processErrorHandle
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);


export const getOfferDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOfferData',
  async (clickedOfferId, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferData>(`${APIRoute.Offers}/${clickedOfferId}`);
    dispatch(getOfferData(data));
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setErrorOfferData(false));
  },
);

export const getOffersNearbyAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOffersNearby',
  async (clickedOfferId, { dispatch, extra: api }) => {
    const response = await api.get<Offer[]>(`${APIRoute.Offers}/${clickedOfferId}/nearby`);
    const { data } = response;
    dispatch(getOffersNearby(data));
    dispatch(setErrorOfferData(false));
  },
);

export const getOfferReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOfferReviews',
  async (clickedOfferId, { dispatch, extra: api }) => {
    const response = await api.get<Review[]>(`/comments/${clickedOfferId}`);
    const { data } = response;
    dispatch(getOfferReviews(data));
    dispatch(setErrorOfferData(false));
  },
);


export const postNewCommentAction = createAsyncThunk<void, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postNewComment',
  async (param, { dispatch, extra: api }) => {
    const { clickedOfferId, rating, comment } = param;
    const response = await api.post<Review>(`/comments/${clickedOfferId}`, { rating, comment });
    const { data } = response;
    dispatch(postNewComment(data));
  },
);
