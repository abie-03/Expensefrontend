import React, { useEffect, useState } from "react";
import ExpenseItem from "./components/expenseItem";
import ExpenseForm from "./components/expenseFrom";
import Swal from "sweetalert2";
export default function Expense() {
  const [expenses, setExpenses] = useState([
    // {
    //   id: 1,
    //   title: "Book",
    //   amount: 100,
    // },
    // {
    //   id: 2,
    //   title: "Dress",
    //   amount: 800,
    // },
  ]);
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const getExpense = () => {
    fetch("https://expensebackend-3.onrender.com/expense/all")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getExpense();
  }, []);
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
    // console.log(expenses.filter((expense) => expense.id != id));
    // setExpenses(expenses.filter((expense) => expense.id != id));
    fetch(`https://expensebackend-3.onrender.com/expense/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => getExpense())
      .catch((err) => console.log(err));
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
    // const item = { id: expenses.length + 1, title: title, amount: amount };
    // setExpenses([...expenses, item]);
    if (amount === null || title === null) {
      Swal.fire({
        title: "Fill both the fields",
        icon: "warning",
      });
    } else if (amount == 0 || amount < income + outgoing) {
      Swal.fire({
        title: "Insufficient Balance",
        icon: "warning",
      });
    } else {
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
      })
        .then(() => {
          getExpense();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div>
        <div>Expense Tracker</div>
        <div className="balance">Balance: {income + outgoing}</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>{income}</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>{outgoing}</span>
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
          title={expense.category}
          amount={expense.amount}
          id={expense._id}
          deleteExpense={deleteExpense}
        />
      ))}
    </>
  );
}
