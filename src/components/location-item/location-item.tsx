import { Cities } from '../../types/location';
import { useAppSelector } from '../../hooks';
import { getLocation } from '../../store/offers-data/offers-data.selectors';

type LocationItemProps = {
  city: string;
  onMouseClick: (city: Cities) => void;
}

function LocationItem({ city, onMouseClick }: LocationItemProps): JSX.Element {
  const currentCity = useAppSelector(getLocation);

  const handleMouseClick = () => {
    onMouseClick(city as Cities);
  };

  const isChecked = city === currentCity;
  const className = `locations__item-link tabs__item ${isChecked ? 'tabs__item--active' : ''}`;

  return (
    <a className={className} onClick={handleMouseClick}>
      <span>{city}</span>
    </a>
  );
}

export default LocationItem;
