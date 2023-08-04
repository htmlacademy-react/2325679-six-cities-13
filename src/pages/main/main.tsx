import Logo from '../../components/logo/logo';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import LocationsList from '../../components/location-list/location-list';
import { useAppSelector } from '../../hooks';
import NoOffers from '../../components/no-offers/no-offers';

function MainPage(): JSX.Element {

  const offers = useAppSelector((store) => store.offersByCity);
  const location = useAppSelector((store) => store.city);
  const selectedOfferId = useAppSelector((store) => store.selectedOfferId);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
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
                <b className="places__found">{offers.length} places to stay in {location}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by&nbsp;</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <PlaceCardList offers={offers} layout='main' count={offers.length} />
              </section>
              <div className="cities__right-section">
                <Map offers={offers} layout='main' selectedOfferId={selectedOfferId}></Map>
              </div>
            </div>
          </div>}
        {offers.length === 0 && <NoOffers city={location} />}
      </main>
    </div>
  );
}

export default MainPage;
