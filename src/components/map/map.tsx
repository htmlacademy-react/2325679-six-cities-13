import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Location} from '../../types/location';
import {Offer} from '../../types/offer';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../constants';

type MapProps = {
  location: Location;
  offers: Offer[];
  className: string;
  style: object;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({location, offers, className, style}: MapProps) {
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
      className={`${className} map`}
      style={style}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
