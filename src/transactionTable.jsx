import React from "react";

import "./App.css";

function TransactionsTable({ transactionState }) {
  return (
    <div className="trasact-table">
      <h2>Transactions</h2>
      <table>
        <tr>
          <th>Bank</th>
          <th>Account Number</th>
          <th>Transfer Amount</th>
          <th>Transfer Charge</th>
          <th>Date/Time</th>
        </tr>
        {transactionState.map((item, index) => (
          <tr key={index}>
            <td>{item.bank}</td>
            <td>{item.accountNo}</td>
            <td>{item.amount}</td>
            <td>{item.minFee}</td>
            <td>{item.time}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default TransactionsTable;
