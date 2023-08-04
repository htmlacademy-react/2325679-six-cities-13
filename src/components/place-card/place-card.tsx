import { Offer } from '../../types/offer';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

type PlaceCardProps = {
  offer: Offer;
  onMouseEvent: (id: string) => void;
  layout: string;
}

function PlaceCard({ offer, onMouseEvent, layout }: PlaceCardProps): JSX.Element {
  const handleMouseEnter: MouseEventHandler<HTMLElement> = () => {
    onMouseEvent(offer.id);
  };

  const handleMouseLeave: MouseEventHandler<HTMLElement> = () => {
    onMouseEvent('');
  };

  const isOfferLayout = layout === 'offers';
  const articleClassName = isOfferLayout ? 'near-places__card' : 'cities__card';
  const imageWrapperClassName = isOfferLayout ? 'near-places__image-wrapper' : 'cities__image-wrapper';

  return (
    <Link className="game__back" to={`${AppRoute.Offer}/${offer.id}`}>
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
              className={`button place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active button' : ''}`}
              type="button"
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
              <span style={{ width: `${offer.rating * 100 / 5}%` }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {offer.title}
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    </Link>
  );
}

export default PlaceCard;
