import { useState, useEffect, useMemo } from "react";
import { Section, ContactsList, ContactForm, Filter } from "./components/index";
import { nanoid } from "nanoid";
const KEY = "contacts";

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(KEY)) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(
    () => window.localStorage.setItem(KEY, JSON.stringify(contacts)),
    [contacts]
  );

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) => contact.name.toLowerCase().includes(filter)),
    [filter, contacts]
  );

  const generateId = () => nanoid();

  const addContact = (name, number) => {
    const checkContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts([{ name, id: generateId(), number }, ...contacts]);
    setFilter("");
  };
  const filterContacts = (event) => {
    setFilter(event.currentTarget.value.toLowerCase());
  };
  const deleteContact = (id) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };

  return (
    <>
      <Section title={"Phonebook"}>
        <ContactForm onSabmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter onChange={filterContacts} filter={filter}>
          Find contacts by name
        </Filter>
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
