import {Offer} from '../../types/offer';
import PlaceCard from '../../components/place-card/place-card';
import {useState} from 'react';

type ListPlaceCardProps = {
  offers: Offer[];
  className: string;
  count: number;
}

function ListPlaceCard({ offers, className, count } : ListPlaceCardProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState('');
  const handleActiveCard = (id?: string) => setActiveCard(id || '');
  return (
    <div className={`${className === 'near-' ? 'near-places__list' : 'cities__places-list'} places__list tabs__content`}>
      {offers.slice(0, count).map((offer) => (
        <PlaceCard key={offer.id} offer={offer} onMouseEvent={handleActiveCard} className={className} />
      ))};
    </div>
  );
}

export default ListPlaceCard;
