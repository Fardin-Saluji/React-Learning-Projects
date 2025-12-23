import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { ContactContext } from "../context/ContactContext";
import useFormValidation from "../hooks/useFormValidation";

const ContactForm = () => {
  const { addContact } = useContext(ContactContext);
  const { validate } = useFormValidation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!validate(name, phone, email)) {
        alert("Invalid Input!");
        return;
      }

      addContact({ name, phone, email });

      setName("");
      setPhone("");
      setEmail("");
    },
    [name, phone, email, validate, addContact]
  );

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Contact</h2>

      <input
        ref={nameInputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
