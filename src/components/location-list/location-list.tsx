import LocationItem from '../location-item/location-item';
import { CITIES } from '../../constants';
import { useAppDispatch } from '../../hooks/index';
import { changeCity, getOffers } from '../../store/offers-data/offers-data.slice';
import { Cities } from '../../types/location';
import { useCallback } from 'react';

function LocationsList(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLocation = useCallback((city: Cities) => {
    dispatch(changeCity({ city }));
    dispatch(getOffers());
  }, [dispatch]);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city}>
            <LocationItem city={city} onMouseClick={handleLocation} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LocationsList;


