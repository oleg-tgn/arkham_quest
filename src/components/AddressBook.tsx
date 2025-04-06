import React, { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useStateContext } from '../contexts/StateContext';
import { AddressBookData } from '../data/AddressBookData';

type AddressRecord = {
  name: string;
  code: string;
};

const AddressBook: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const logTextRef = useRef<HTMLDivElement>(null);

  const { addressBookFilterText, setAddressBookFilterText } = useStateContext();

  const [filteredData, setFilteredData] = useState<AddressRecord[]>(AddressBookData);

  const filterAddresses = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setAddressBookFilterText(searchText);

    const filtered = AddressBookData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [setAddressBookFilterText]);

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
      {/* Бумажный фон со списком */}
      <div
        className="bg-arkham-book bg-[#f8f5e4] shadow-lg rounded-lg p-7 font-serif text-gray-800 leading-relaxed h-[calc(100vh-200px)] overflow-y-auto"
        ref={logTextRef}
      >
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

      {/* Форма поиска */}
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

export default AddressBook;
