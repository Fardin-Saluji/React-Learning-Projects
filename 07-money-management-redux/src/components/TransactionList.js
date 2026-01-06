import { useSelector } from "react-redux";

const TransactionList = () => {
  const history = useSelector((state) => state.transactions.history);

  return (
    <div>
      <h3>Transaction History</h3>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {item.type.toUpperCase()} ₹{item.amount} — {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
