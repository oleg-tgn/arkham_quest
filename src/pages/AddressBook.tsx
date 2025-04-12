import React, { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { AddressBookData } from '../data/AddressBookData';
import { useGameStore } from '../store/useGameStore'; // ← Zustand store

type AddressRecord = {
  name: string;
  code: string;
};

export const AddressBook: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const logTextRef = useRef<HTMLDivElement>(null);

  const addressBookFilterText = useGameStore(state => state.addressBookFilterText);
  const setAddressBookFilterText = useGameStore(state => state.setAddressBookFilterText);

  const [filteredData, setFilteredData] = useState<AddressRecord[]>(AddressBookData);

  const filterAddresses = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value;
      setAddressBookFilterText(searchText);

      const filtered = AddressBookData.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    },
    [setAddressBookFilterText],
  );

  useEffect(() => {
    filterAddresses({ target: { value: addressBookFilterText } } as ChangeEvent<HTMLInputElement>);
  }, [addressBookFilterText, filterAddresses]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = addressBookFilterText;
    }
  }, [addressBookFilterText]);

  return (
    <div className="space-y-4">
      <div className="arkhem-content h-[calc(100vh-175px)]" ref={logTextRef}>
        {filteredData.map((addressRecord, index, array) => {
          const previous = index > 0 ? array[index - 1].name[0] : null;
          const current = addressRecord.name[0];
          return (
            <React.Fragment key={index}>
              {current !== previous && (
                <h2 className="text-xl font-bold text-[#3b3b3b] mt-4 mb-2">{current}</h2>
              )}
              <div className="flex justify-between border-b border-gray-300 py-1 text-sm">
                <span>{addressRecord.name}</span>
                <span className="text-gray-500">{addressRecord.code}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="bg-arkham-book form px-4 py-3 rounded-md shadow flex items-center gap-2">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full text-sm"
          placeholder="Начните вводить искомую локацию или имя"
          ref={inputRef}
          onChange={filterAddresses}
        />
      </div>
    </div>
  );
};
