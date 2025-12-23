import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { ContactProvider } from "./context/ContactContext";
import "./styles.css";

const App = () => {
  return (
    <ContactProvider>
      <div className="container">
        <h1>📇 Contact Card App</h1>
        <ContactForm />
        <ContactList />
      </div>
    </ContactProvider>
  );
};

export default App;
