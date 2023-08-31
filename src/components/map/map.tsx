import leaflet, { Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer, OfferData } from '../../types/offer';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants';

type MapProps = {
  city?: City;
  offers: Offer[];
  layout: string;
  selectedOfferId?: string;
  offerData?: OfferData;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ offers, layout, selectedOfferId, city, offerData }: MapProps) {
  const mapRef = useRef(null);
  const locationData = city?.location || offers[0].city.location;
  const map = useMap(mapRef, locationData);
  const isOfferMap = layout === 'offers';
  const stylesMainMap = { height: '100%', width: '500px' };
  const stylesOfferMap = { width: '1149px', height: '579px', margin: '0px auto 50px' };

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      map.setView(
        {
          lat: locationData.latitude,
          lng: locationData.longitude,
        },
        locationData.zoom,
      );
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          selectedOfferId && selectedOfferId === offer.id
            ? currentCustomIcon
            : defaultCustomIcon
        ).addTo(markerLayer);
      });

      if (offerData) {
        const marker = new Marker({
          lat: offerData.location.latitude,
          lng: offerData.location.longitude,
        });
        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, locationData.latitude, locationData.longitude, locationData.zoom, selectedOfferId, offerData]);

  return (
    <section
      className={`${isOfferMap ? 'offer__map' : 'cities__map'} map`}
      style={isOfferMap ? stylesOfferMap : stylesMainMap}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
