import React, { useEffect, useState } from 'react';
import Footer from "./Footer";
import Navbar from "./Navbar";

function Transactions({ accessToken }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactionDetails = () => {
      fetch('https://banksystem-26.onrender.com/transaction_details', {
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
    };

    fetchTransactionDetails();
  }, [accessToken]);

  const handleDelete = (transactionId) => {
    fetch(`https://banksystem-26.onrender.com/transaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setTransactions(prevTransactions =>
            prevTransactions.filter(transaction => transaction.id !== transactionId)
          );
        } else {
          console.error('Failed to delete transaction:', res.statusText);
        }
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>
                  <button onClick={() => handleDelete(transaction.id)} className='delete-transaction-btn' >Delete</button>
                </td>
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
