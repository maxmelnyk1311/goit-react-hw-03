import { useState, useEffect } from 'react';

import ContactList from '../ContactList/ContactList.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';

const searchBarTxt = "Find contacts by name";
const KEY = "saved-contacts";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem(KEY);
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ]
  });

  const [inputItems, setInputChanges] = useState({
    inputValue: "",
    contactsForFilter: contacts,
  });

  const handleChange = (event) => {
    const currentInputValue = event.target.value;
    setInputChanges({
      ...inputItems,
      inputValue: inputItems.inputValue = currentInputValue
    });
    const filteredByQueryContacts = inputItems.contactsForFilter.filter((contact) => contact.name.toLowerCase().includes(currentInputValue.toLowerCase()));
    console.log(filteredByQueryContacts);
    if (inputItems.inputValue == "") {
      setInputChanges({
        ...inputItems,
        contactsForFilter: inputItems.contactsForFilter = contacts
      })
    } else {
      setInputChanges({
        ...inputItems,
        contactsForFilter: inputItems.contactsForFilter = filteredByQueryContacts
    })
    }
  };

  function addNewContact(formData) {
    setContacts([
      ...contacts,
      formData
    ]);
  }

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  function deleteContact(event) {
    const contactToDelete = event.target.id;
    const contactsAfterDelete = contacts.filter((contact) => contact.id !== contactToDelete);
    setContacts(contactsAfterDelete);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm 
        onSubmit={addNewContact}
      />
      <SearchBox 
        searchBarTxt={searchBarTxt}
        inputValue={inputItems.inputValue}
        handleChange={handleChange}
      />
      <ContactList 
        contacts={inputItems.inputValue == "" ? contacts : inputItems.contactsForFilter}
        deleteContact={deleteContact}
      />
    </div>
  )
}


