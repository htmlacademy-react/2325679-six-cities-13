import { Route, BrowserRouter, Routes } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/404/404';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';
import {location} from '../../mocks/location';
import { Review } from '../../types/review';


type AppScreenProps = {
  offers: Offer[];
  reviews: Review[];
}

function App({ offers, reviews }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offers={offers} location={location}/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesPage offers = {offers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage offers={offers} reviews={reviews} location={location}/>}>
          <Route path=':id' element={<OfferPage offers={offers} reviews={reviews} location={location}/>} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
