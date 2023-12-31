import { MouseEventHandler } from 'react';
import Auth from '../../components/auth/auth';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { favoritesOfferAction } from '../../store/api-actions';
import { getFavoritesOffers, getFavoritesStatusLoading } from '../../store/offers-data/offers-data.selectors';
import FavoritesEmptyPage from '../favorites-empty/favorites-empty';
import { CITIES } from '../../constants';
import Loader from '../../components/loader/loader';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const isFavoritesLoading = useAppSelector(getFavoritesStatusLoading);

  if (isFavoritesLoading) {
    return <Loader />;
  }

  if (favoritesOffers.length === 0) {
    return (
      <FavoritesEmptyPage />
    );
  }

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    dispatch(favoritesOfferAction({
      offerId: event.currentTarget.id,
      status: 0
    }));
  };

  return (
    <div className="page">
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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.map((city) => {
                const cityFavoriteOffers = favoritesOffers.filter(
                  (offer) => offer.city.name === city
                );
                return (
                  cityFavoriteOffers.length ?
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {cityFavoriteOffers.map((offer) => (
                          <article className="favorites__card place-card" key={offer.id}>
                            {offer.isPremium ?
                              <div className="place-card__mark">
                                <span>Premium</span>
                              </div> : ''}
                            <div className="favorites__image-wrapper place-card__image-wrapper">
                              <a href="#">
                                <img
                                  className="place-card__image"
                                  src={offer.previewImage}
                                  width={150}
                                  height={110}
                                  alt={offer.title}
                                />
                              </a>
                            </div>
                            <div className="favorites__card-info place-card__info">
                              <div className="place-card__price-wrapper">
                                <div className="place-card__price">
                                  <b className="place-card__price-value">€{offer.price}</b>
                                  <span className="place-card__price-text">
                                    /&nbsp;night
                                  </span>
                                </div>
                                <button
                                  className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
                                  type="button"
                                  id={offer.id}
                                  onClick={handleButtonClick}
                                >
                                  <svg
                                    className="place-card__bookmark-icon"
                                    width={18}
                                    height={19}
                                  >
                                    <use xlinkHref="#icon-bookmark" />
                                  </svg>
                                  <span className="visually-hidden">In bookmarks</span>
                                </button>
                              </div>
                              <div className="place-card__rating rating">
                                <div className="place-card__stars rating__stars">
                                  <span style={{ width: `${offer.rating * 100 / 5}%` }} />
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <h2 className="place-card__name">
                                <a href="#">{offer.title}</a>
                              </h2>
                              <p className="place-card__type">{offer.type}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </li>
                    : null
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}

export default FavoritesPage;
