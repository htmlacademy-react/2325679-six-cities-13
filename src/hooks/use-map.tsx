import { useEffect, useState, useRef, MutableRefObject } from 'react';
import {Map, TileLayer} from 'leaflet';
import {Location} from '../types/location';
import { TILE_LAYER, COPYRIGHT } from '../constants';

function useMap(mapRef : MutableRefObject<HTMLElement | null>, locationData : Location) : Map | null{
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: locationData.latitude,
          lng: locationData.longitude,
        },
        zoom: locationData.zoom,
      });

      const layer = new TileLayer(TILE_LAYER, {attribution: COPYRIGHT});

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, locationData]);

  return map;
}

export default useMap;
