const ContactCard = ({ contact }) => {
  return (
    <div className="card">
      <h3>{contact.name}</h3>
      <p>📞 {contact.phone}</p>
      <p>📩 {contact.email}</p>
    </div>
  );
};

export default ContactCard;
