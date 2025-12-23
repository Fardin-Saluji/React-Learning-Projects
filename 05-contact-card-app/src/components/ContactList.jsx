import { useContext, useMemo } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactCard from "./ContactCard";

const ContactList = () => {
  const { contacts } = useContext(ContactContext);

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts]);
   

  return (
    <div className="list">
      <h2>Saved Contacts</h2>

      {sortedContacts.map((c, index) => (
        <ContactCard key={index} contact={c} />
      ))}
    </div>
  );
};




export default ContactList;
