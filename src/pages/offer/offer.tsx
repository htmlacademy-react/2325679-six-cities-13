import Logo from '../../components/logo/logo';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import Page404 from '../page-404/page-404';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Auth from '../../components/auth/auth';
import { getOfferDataAction, getOffersNearbyAction, getOfferReviewsAction, favoritesOfferAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus, IMAGE_COUNT, NEARBY_OFFERS_COUNT } from '../../constants';
import { useEffect, useState } from 'react';
import { getErrorOfferData, getOfferReviews, getOffersData, getOffersNearby } from '../../store/offers-data/offers-data.selectors';
import { getAuthorizationStatus } from '../../store/auth-process/auth-process.selectors';
import { redirectToRoute } from '../../store/action';
import { capitalizeString } from '../../utils';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentOfferData = useAppSelector(getOffersData);
  const currentOfferDataImages = currentOfferData.images;
  const neighbourOffers = useAppSelector(getOffersNearby).slice(0, NEARBY_OFFERS_COUNT);
  const errorOfferData = useAppSelector(getErrorOfferData);
  const offerReviews = useAppSelector(getOfferReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isFavorite, setIsFavorite] = useState(currentOfferData.isFavorite);

  useEffect(() => {
    const needToGetData = currentOfferData.id !== id || Object.keys(currentOfferData).length === 0;

    if (needToGetData && id && !errorOfferData) {
      dispatch(getOfferDataAction(id));
      dispatch(getOffersNearbyAction(id));
      dispatch(getOfferReviewsAction(id));
    }
  }, [currentOfferData, dispatch, errorOfferData, id]);

  if (Object.keys(currentOfferData).length === 0 || !id) {
    return <Page404 />;
  }

  const handleButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(favoritesOfferAction({
        offerId: id,
        status: Number(!isFavorite)
      }));
      setIsFavorite(!isFavorite);
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
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
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOfferDataImages.slice(0, IMAGE_COUNT).map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img
                    className="offer__image"
                    src={img}
                    alt={img}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOfferData.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOfferData.title}
                </h1>
                <button className={isFavorite ? 'offer__bookmark-button button offer__bookmark-button--active' : 'offer__bookmark-button button'}
                  type="button"
                  onClick={handleButtonClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(currentOfferData.rating) * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOfferData.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOfferData.type === 'room'
                  ? 'Private Room'
                  : capitalizeString(currentOfferData.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOfferData.bedrooms} Bedroom{currentOfferData.bedrooms === 1 ? '' : 's'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOfferData.maxAdults} adult{currentOfferData.maxAdults === 1 ? '' : 's'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOfferData.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&#39;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOfferData.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOfferData.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOfferData.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOfferData.host.name}</span>
                  {currentOfferData.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOfferData.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={offerReviews} />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm id={id} />}
              </section>
            </div>
          </div>
          <Map offers={neighbourOffers} layout='offers' city={currentOfferData.city} offerData={currentOfferData}></Map>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <PlaceCardList offers={neighbourOffers} layout='offers' count={3} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
