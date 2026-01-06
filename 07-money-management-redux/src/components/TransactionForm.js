import { useDispatch } from "react-redux";
import { credit, debit, saveTransactionAsync } from "../features/transactions/transactionSlice";
import { useState } from "react";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const handleTransaction = (type) => {
    const transaction = {
      id: Date.now(),
      amount: Number(amount),
      type,
      date: new Date().toLocaleString(),
    };

    if (type === "credit") {
      dispatch(credit(transaction));
    } else {
      dispatch(debit(transaction));
    }

    dispatch(saveTransactionAsync(transaction));
    setAmount("");
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />
      <button onClick={() => handleTransaction("credit")}>Credit</button>
      <button onClick={() => handleTransaction("debit")}>Debit</button>
    </div>
  );
};

export default TransactionForm;
