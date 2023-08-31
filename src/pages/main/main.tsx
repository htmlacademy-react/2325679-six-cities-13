import Logo from '../../components/logo/logo';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import LocationsList from '../../components/location-list/location-list';
import { useAppSelector } from '../../hooks';
import NoOffers from '../../components/no-offers/no-offers';
import Sorting from '../../components/sorting/sorting';
import Auth from '../../components/auth/auth';
import { getLocation, getSortedOffers } from '../../store/offers-data/offers-data.selectors';
import { getSelectedOfferId } from '../../store/map/map.selectors';

function MainPage(): JSX.Element {
  const offers = useAppSelector(getSortedOffers);
  const location = useAppSelector(getLocation);
  const selectedOfferId = useAppSelector(getSelectedOfferId);

  if (!offers || offers.length === 0) {
    return <NoOffers city={location} />;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <Auth />
          </div>
        </div>
      </header>
      <main className={`page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList />
        </div>
        {offers.length !== 0 &&
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} place{offers.length === 1 ? '' : 's'} to stay in {location}</b>
                <Sorting />
                <PlaceCardList offers={offers} layout='main' count={offers.length} />
              </section>
              <div className="cities__right-section">
                <Map offers={offers} layout='main' selectedOfferId={selectedOfferId}></Map>
              </div>
            </div>
          </div>}
      </main>
    </div>
  );
}

export default MainPage;
