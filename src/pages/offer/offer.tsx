import Logo from '../../components/logo/logo';
import { useParams } from 'react-router-dom';
import { Offer } from '../../types/offer';
import ReviewForm from '../../components/review-form/review-form';
import { Review } from '../../types/review';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import Page404 from '../404/404';
import { useAppSelector } from '../../hooks';
import Auth from '../../components/auth/auth';

type OfferPageProps = {
  reviews: Review[];
}

function OfferPage({ reviews }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const selectedOfferId = useAppSelector((store) => store.selectedOfferId);
  const offers : Offer[] = useAppSelector((store) => store.offersByCity);
  const currentOffer = offers.find((offer) => {
    if (id === offer.id) {
      return offer;
    }
  });

  if (!id) {
    return <Page404 />;
  }

  const NeighbourOffers = offers.slice(0, 3);

  if (!currentOffer) {
    return <Page404 />;
  }

  return (
    currentOffer
      &&
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
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={currentOffer.previewImage}
                    alt={currentOffer.title}
                  />
                </div>
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src="img/apartment-01.jpg"
                    alt="Photo studio"
                  />
                </div>
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src="img/apartment-02.jpg"
                    alt="Photo studio"
                  />
                </div>
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src="img/apartment-03.jpg"
                    alt="Photo studio"
                  />
                </div>
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src="img/studio-01.jpg"
                    alt="Photo studio"
                  />
                </div>
                <div className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src="img/apartment-01.jpg"
                    alt="Photo studio"
                  />
                </div>
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {currentOffer.isPremium ?
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div> : ''}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {currentOffer.title}
                  </h1>
                  <button className={currentOffer.isFavorite ? 'offer__bookmark-button button offer__bookmark-button--active' : 'offer__bookmark-button button'} type="button">
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${currentOffer.rating * 100 / 5}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    3 Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max 4 adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{currentOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&#39;s inside</h2>
                  <ul className="offer__inside-list">
                    <li className="offer__inside-item">Wi-Fi</li>
                    <li className="offer__inside-item">Washing machine</li>
                    <li className="offer__inside-item">Towels</li>
                    <li className="offer__inside-item">Heating</li>
                    <li className="offer__inside-item">Coffee machine</li>
                    <li className="offer__inside-item">Baby seat</li>
                    <li className="offer__inside-item">Kitchen</li>
                    <li className="offer__inside-item">Dishwasher</li>
                    <li className="offer__inside-item">Cabel TV</li>
                    <li className="offer__inside-item">Fridge</li>
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src="img/avatar-angelina.jpg"
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">Angelina</span>
                    <span className="offer__user-status">Pro</span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      A quiet cozy and picturesque that hides behind a a river by the
                      unique lightness of Amsterdam. The building is green and from
                      18th century.
                    </p>
                    <p className="offer__text">
                      An independent House, strategically located between Rembrand
                      Square and National Opera, but where the bustle of the city
                      comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <ReviewsList reviews={reviews} />
                  <ReviewForm />
                </section>
              </div>
            </div>
            <Map offers={NeighbourOffers} layout='offers' selectedOfferId={selectedOfferId}></Map>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <PlaceCardList offers={offers} layout='offers' count={3} />
            </section>
          </div>
        </main>
      </div>
  );
}

export default OfferPage;
