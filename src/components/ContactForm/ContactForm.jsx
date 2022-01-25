import { useState } from "react";
import { Button } from "..";
import { Form, Input } from "./ContactForm.styled";
import PropTypes from "prop-types";

export const ContactForm = ({ onSabmit, idGenerator }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const nameInputId = idGenerator();
  const numberInputId = idGenerator();
  const handleSubmit = (event) => {
    event.preventDefault();
    onSabmit(name, number);
    reset();
  };
  const reset = () => {
    setName("");
    setNumber("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <Input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        id={nameInputId}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label htmlFor={numberInputId}>Number</label>
      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        id={numberInputId}
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

ContactForm.propTypes = {
  onSabmit: PropTypes.func.isRequired,
  idGenerator: PropTypes.func.isRequired,
};
