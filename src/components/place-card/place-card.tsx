import { Offer } from '../../types/offer';
import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { favoritesOfferAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/auth-process/auth-process.selectors';
import { redirectToRoute } from '../../store/action';
import { capitalizeString } from '../../utils';

type PlaceCardProps = {
  offer: Offer;
  onMouseEvent: (id: string) => void;
  layout: string;
}

function PlaceCard({ offer, onMouseEvent, layout }: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  const handleMouseEnter: MouseEventHandler<HTMLElement> = () => {
    onMouseEvent(offer.id);
  };

  const handleMouseLeave: MouseEventHandler<HTMLElement> = () => {
    onMouseEvent('');
  };

  const handleButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(favoritesOfferAction({
        offerId: offer.id,
        status: Number(!isFavorite)
      }));
      setIsFavorite(!isFavorite);
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  const isOfferLayout = layout === 'offers';
  const articleClassName = isOfferLayout ? 'near-places__card' : 'cities__card';
  const imageWrapperClassName = isOfferLayout ? 'near-places__image-wrapper' : 'cities__image-wrapper';

  return (
    <article className={`${articleClassName} place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {offer.isPremium && (<div className="place-card__mark"> <span>Premium</span> </div>)}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <img
          className="place-card__image"
          src={offer.previewImage}
          width={260}
          height={200}
          alt={offer.title}
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&nbsp;/&nbsp;night</span>
          </div>
          <button
            className={`button place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active button' : ''}`}
            type="button"
            onClick={handleButtonClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link className="game__back" to={`${AppRoute.Offer}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeString(offer.type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
