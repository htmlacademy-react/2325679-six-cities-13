import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import { useAppDispatch } from '../../hooks/index';
import { selectOffer } from '../../store/user-process/user-process.slice';
import { useCallback } from 'react';

type PlaceCardListProps = {
  offers: Offer[];
  layout: string;
  count: number;
}

function PlaceCardList({ offers, layout, count }: PlaceCardListProps): JSX.Element | null{
  const dispatch = useAppDispatch();

  const handleSelectedOffer = useCallback((id: string) => {
    dispatch(selectOffer({id}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOfferLayout = layout === 'offers';
  const hasOffers = offers.length !== 0;

  if (!hasOffers) {
    return null;
  }

  return (
    hasOffers &&
    (
      <div className={`${isOfferLayout ? 'near-places__list' : 'cities__places-list'} places__list tabs__content`}>
        {offers.slice(0, count).map((offer) => (
          <PlaceCard key={offer.id} offer={offer} onMouseEvent={handleSelectedOffer} layout={`${isOfferLayout ? 'offers' : 'main'}`} />
        ))}
      </div>
    )
  );
}

export default PlaceCardList;
