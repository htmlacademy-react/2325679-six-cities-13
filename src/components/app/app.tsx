import { Route, Routes } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/404/404';
import PrivateRoute from '../private-route/private-route';
import { Review } from '../../types/review';
import {useAppSelector} from '../../hooks';
import Loader from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {useAppDispatch} from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { getToken } from '../../services/token';

type AppScreenProps = {
  reviews: Review[];
}

function App({ reviews }: AppScreenProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const token = getToken();

  if (authorizationStatus === AuthorizationStatus.Unknown && token) {
    dispatch(loginAction({}));
  }

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
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage reviews={reviews} />}>
          <Route path=':id' element={<OfferPage reviews={reviews} />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
