import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import TransactionsTable from "./transactionTable";
import FormData from "./component/form";
import Time from "./component/Time";

function App() {
  const [transactionState, setTransactionState] = useState([]);

  const setTransaction = value => {
    const { minFee } = value;
    toast.success(`the minimum fee charge is ${minFee}`, {
      position: toast.POSITION.TOP_CENTER
    });
    const valueData = {
      ...value,
      time: Time()
    };

    setTransactionState([valueData, ...transactionState]);
  };

  return (
    <div>
      <div className="title">
        <h2>TRANSACTION FEE CALCULATOR</h2>
      </div>
      <div className="main">
        <ToastContainer />
        <FormData setTransaction={setTransaction} />
        <div className="trasact-table">
          {transactionState.length > 0 ? (
            <TransactionsTable transactionState={transactionState} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
