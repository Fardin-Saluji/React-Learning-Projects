import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Money Management App</h1>
      <Balance />
      <TransactionForm />
      <TransactionList />
    </div>
  );
}

export default App;
