import React from "react";
import { PageButton } from "./Button.styled";
import PropTypes from "prop-types";
export const Button = ({
  type = "button",
  children,
  contactId,
  onDeleteContact,
}) => {
  const onBtnClick = (e) => {
    e.target.blur();
  };
  return onDeleteContact ? (
    <PageButton type={type} onClick={() => onDeleteContact(contactId)}>
      {children}
    </PageButton>
  ) : (
    <PageButton type={type} onClick={onBtnClick}>
      {children}
    </PageButton>
  );
};
Button.propTypes = {
  type: PropTypes.string,
  contactId: PropTypes.string,
  onDeleteContact: PropTypes.func,
};
