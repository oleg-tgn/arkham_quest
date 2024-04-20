import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useStateContext } from '../contexts/StateContext';
import AddressBookData from '../data/AddressBookData';

function AddressBook(props) {    
    const inputRef = useRef(null);
    const logTextRef = useRef(null);

    const context = useStateContext();
    const addressBookFilterText = context.addressBookFilterText;
    const setAddressBookFilterText = context.setAddressBookFilterText;

    // State to store the filtered data
    const [filteredData, setFilteredData] = useState(AddressBookData);

   // Memoizing filterAddresses function to prevent unnecessary re-renders
   const filterAddresses = useCallback((event) => {
        const searchText = event.target.value;
        setAddressBookFilterText(searchText);
        const filtered = AddressBookData.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [setAddressBookFilterText]);  // Only recreate if setAddressBookFilterText changes

    // useEffect to handle changes in AddressBookData or filterText
    useEffect(() => {
        filterAddresses({ target: { value: addressBookFilterText } }); // Reapply filtering on data update
    }, [addressBookFilterText, filterAddresses]); // Dependency on AddressBookData to re-filter if it changes

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
                            {current !== previous && (
                                <h2>{current}</h2> // Insert <h2> when the first letter changes
                            )}
                            <div className='addressRecord'>
                                <span className='addressRecord__name'>{addressRecord.name}</span>
                                <span className='addressRecord__code'>{addressRecord.code}</span>
                            </div>
                        </React.Fragment>
                    );
                })} 
            </div>            
            <div className="form">
                <input type="text" className="input" placeholder="Начните вводить искомую локацию или имя"
                    ref={inputRef} onChange={filterAddresses}/>                
            </div>        
        </div>        
    );
}

export default AddressBook;
