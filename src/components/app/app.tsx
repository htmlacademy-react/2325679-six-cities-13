import { Route, Routes } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector} from '../../hooks';
import Loader from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {useAppDispatch} from '../../hooks';
import { fetchOfferAction, getFavoriteOffersAction, loginAction } from '../../store/api-actions';
import { getToken } from '../../services/token';
import { useEffect } from 'react';
import { getSortedOffers, getStatusLoading } from '../../store/offers-data/offers-data.selectors';
import { getAuthorizationStatus } from '../../store/auth-process/auth-process.selectors';
import { clearFavortiteOffers } from '../../store/offers-data/offers-data.slice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const isOffersDataLoading = useAppSelector(getStatusLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offers = useAppSelector(getSortedOffers);
  const token = getToken();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(loginAction({}));
    }
  });

  useEffect(() => {
    dispatch(fetchOfferAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getFavoriteOffersAction());
    }

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(clearFavortiteOffers());
    }

  }, [authorizationStatus, dispatch, offers, token]);

  if (isOffersDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />}>
          <Route path=':id' element={<OfferPage />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
