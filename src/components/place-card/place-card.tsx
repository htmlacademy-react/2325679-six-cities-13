import { Offer } from '../../types/offer';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

type PlaceCardProps = {
  offer: Offer;
  onMouseEvent: (id?: string) => void;
}

function PlaceCard({ offer, onMouseEvent }: PlaceCardProps): JSX.Element {
  const handleMouseEnter: MouseEventHandler<HTMLElement> = () => {
    onMouseEvent(offer.id);
  };
  const handleMouseLeave: MouseEventHandler<HTMLElement> = () => {
    onMouseEvent('');
  };
  return (
    <Link className="game__back" to={`${AppRoute.Offer}/${offer.id}`}>
      <article className="cities__card place-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {offer.isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> : ''}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={offer.previewImage}
              width={260}
              height={200}
              alt={offer.title}
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{offer.price}</b>
              <span className="place-card__price-text">&nbsp;/&nbsp;night</span>
            </div>
            <button
              className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
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
