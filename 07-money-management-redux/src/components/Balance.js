import { useSelector } from "react-redux";

const Balance = () => {
  const balance = useSelector((state) => state.transactions.balance);

  return <h2>Balance: ₹{balance}</h2>;
};


export default Balance;

