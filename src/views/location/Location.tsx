import { useState, useMemo } from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import type { LatLon } from 'use-places-autocomplete';

import { PlacesAutocomplete } from '../components/PlacesAutocomplete';

import { googleMapsAPIKey } from '../../services/google/Config';

export const Location: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsAPIKey,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

export const Map: React.FC = () => {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);

  const [selected, setSelected] = useState<LatLon | null>(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container">
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}