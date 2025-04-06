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
    <div>
      <div className="log-text" ref={logTextRef}>
        {filteredData.map((addressRecord, index, array) => {
          const previous = index > 0 ? array[index - 1].name[0] : null;
          const current = addressRecord.name[0];
          return (
            <React.Fragment key={index}>
              {current !== previous && <h2>{current}</h2>}
              <div className="addressRecord">
                <span className="addressRecord__name">{addressRecord.name}</span>
                <span className="addressRecord__code">{addressRecord.code}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="form">
        <input
          type="text"
          className="input"
          placeholder="Начните вводить искомую локацию или имя"
          ref={inputRef}
          onChange={filterAddresses}
        />
      </div>
    </div>
  );
};

export default AddressBook;
