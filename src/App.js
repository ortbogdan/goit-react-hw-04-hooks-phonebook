// import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { Section, ContactsList, ContactForm, Filter } from "./components/index";
import { nanoid } from "nanoid";
const KEY = "contacts";

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(KEY)) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

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
    console.log(contacts);
  };
  const filterContacts = (event) => {
    setFilter(event.currentTarget.value);
  };
  const deleteContact = (id) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };
  const findContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return filteredContacts;
  };
  const findedContacts = findContacts();
  return (
    <>
      <Section title={"Phonebook"}>
        <ContactForm
          onSabmit={addContact}
          idGenerator={generateId}
        ></ContactForm>
      </Section>
      <Section title="Contacts">
        <Filter idGenerator={generateId} onChange={filterContacts}>
          Find contacts by name
        </Filter>
        <ContactsList
          contacts={findedContacts}
          onDeleteContact={deleteContact}
        ></ContactsList>
      </Section>
    </>
  );
};
