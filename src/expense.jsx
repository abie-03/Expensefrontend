import React, { useEffect, useState } from "react";
import ExpenseItem from "./components/expenseItem";
import ExpenseForm from "./components/expenseFrom";
export default function Expense() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Book",
      amount: 100,
    },
    {
      id: 2,
      title: "Dress",
      amount: 800,
    },
  ]);
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  useEffect(() => {
    let income = 0;
    let outgoing = 0;
    expenses.forEach((expense) => {
      if (expense.amount > 0) {
        income = income + parseFloat(expense.amount);
      } else {
        outgoing = outgoing + parseFloat(expense.amount);
      }
    });
    setIncome(income);
    setOutgoing(outgoing);
  }, [expenses]);
  const deleteExpense = (id) => {
    console.log(expenses.filter((expense) => expense.id != id));
    setExpenses(expenses.filter((expense) => expense.id != id));
  };
  // const addExpense = (title, amount) => {
  //   const newExpense = {
  //     id: expenses.length + 1, //or can use Math.random() for unique id
  //     title: title,
  //     amount: amount,
  //   };
  //   setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  //   // or :const existing=epenses;
  //   //existing.push({id:Math.random(),title,amount}
  //   //setExpense(existing);
  // };
  const addExpense = (title, amount) => {
    const item = { id: expenses.length + 1, title: title, amount: amount };
    setExpenses([...expenses, item]);
    fetch("https://expensebackend-3.onrender.com/expense/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        category: title,
        date: new Date(),
      }),
    });
  };
  return (
    <>
      <div>
        <div>Expense Tracker</div>
        <div className="balance">Balance: 0</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>0</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>0</span>
          </div>
        </div>
        {/* form */}
      </div>
      {/* list expenses */}
      {/* <ExpenseItem title={"test"} amount={10}/> */}
      <ExpenseForm addExpense={addExpense} />
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          id={expense.id}
          deleteExpense={() => deleteExpense(expense.id)}
        />
      ))}
    </>
  );
}
