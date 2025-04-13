import { useRef, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { AddressBookData } from '../data/AddressBookData';
import { useGameStore } from '../store/useGameStore';
import { Layout } from '../components/Layout';
import { Typography } from '../components/Typography';

type AddressRecord = {
  name: string;
  code: string;
};

export const AddressBook = () => {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <>
      <Layout variant="book" heightClass="h-full">
        <Layout variant="content">
          {filteredData.map((addressRecord, index, array) => {
            const previous = index > 0 ? array[index - 1].name[0] : null;
            const current = addressRecord.name[0];
            return (
              <div key={index}>
                {current !== previous && <Typography variant="heading-2">{current}</Typography>}
                <Layout variant="addressLine">
                  <Typography variant="text-small">{addressRecord.name}</Typography>
                  <Typography variant="text-small">{addressRecord.code}</Typography>
                </Layout>
              </div>
            );
          })}
        </Layout>
      </Layout>

      <Layout variant="book" heightClass="h-[80px]">
        <Layout variant="form">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full text-sm"
            placeholder="Начните вводить искомую локацию или имя"
            ref={inputRef}
            onChange={filterAddresses}
          />
        </Layout>
      </Layout>
    </>
  );
};
