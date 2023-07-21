import {Offer} from '../../types/offer';
import PlaceCard from '../../components/place-card/place-card';
import {useState} from 'react';

type ListPlaceCardProps = {
  offers: Offer[];
}

function ListPlaceCard({ offers } : ListPlaceCardProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState('');
  const handleActiveCard = (id?: string) => setActiveCard(id || '');
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((value, index) => (
        <PlaceCard key={value.id} offer={offers[index]} onMouseEvent={handleActiveCard} />
      ))};
    </div>
  );
}

export default ListPlaceCard;
