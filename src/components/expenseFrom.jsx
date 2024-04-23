import { useState } from "react";
const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState(null);
  const [amount, setAmount] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, amount);
    addExpense(title, amount);
    console.log("submitted");
  };
  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };
  const handleAmountChange = (event) => {
    console.log(event.target.value);
    setAmount(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default ExpenseForm;
