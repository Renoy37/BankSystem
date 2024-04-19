// import { useState } from 'react';

function Transactions() {
  // const [transactions, setTransactions] = useState([]);

  // // Function to handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Logic to handle form submission (e.g., send data to backend)
  //   // Update transactions state accordingly
  // };

  return (
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
          {/* Map over transactions array and display each transaction */}
          {/* {transactions.map((transaction, index) => (
            <tr key={index} className="transaction-item">
              <td>{transaction.description}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.date}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
