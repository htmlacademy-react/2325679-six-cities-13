import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Location} from '../../types/location';
import {Offer} from '../../types/offer';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT} from '../../constants';

type MapProps = {
  location: Location;
  offers: Offer[];
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/* const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
}); */

function Map({location, offers}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <section
      className="cities__map map"
      style={{height: '560px', width: '500px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
