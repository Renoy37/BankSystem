import React, { useEffect, useState } from 'react';
import Footer from "./Footer";
import Navbar from "./Navbar";

function Transactions({ accessToken }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/transaction_details', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.transactions) {
          setTransactions(data.transactions);
        } else {
          console.error("No transactions data found:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  }, [accessToken]);
  
  return (
    <>
      <Navbar />
      <div className="transactions-container">
        <h1>Transactions</h1>
        <table className="transaction-list">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Transactions;
