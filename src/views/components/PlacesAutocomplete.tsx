import React, { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import type { LatLon } from 'use-places-autocomplete';
import * as Popover from '@radix-ui/react-popover';

interface PlacesAutocompleteProps {
  setSelected: (coords: LatLon) => void;
}

export const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setIsOpen(false);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      console.error("Error fetching geocode data: ", error);
    }
  };

  return (
    <Popover.Root open={isOpen && status === 'OK'} onOpenChange={setIsOpen}>
      {/* Anchor targets the input container for positioning the dropdown */}
      <Popover.Anchor asChild>
        <div className="combobox-container">
          <input
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setIsOpen(true);
            }}
            disabled={!ready}
            className="combobox-input"
            placeholder="Search an address"
          />
        </div>
      </Popover.Anchor>

      {/* Popover content replaces ComboboxPopover/List */}
      <Popover.Content 
        className="combobox-popover" 
        align="start"
        portalled={false}
        onOpenAutoFocus={(e) => e.preventDefault()} // Keeps cursor focus in the input field
      >
        <ul className="combobox-list" role="listbox">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              role="option"
              aria-selected={value === description}
              className="combobox-option"
              onClick={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
};
