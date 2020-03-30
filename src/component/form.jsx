import React, { useState } from "react";
import { toast } from "react-toastify";

import "../App.css";

import Fee from "../data/fees.config.json";

function FormData({ setTransaction }) {
  const initialFormState = {
    bank: "",
    accountNo: "",
    amount: "",
    time: "",
    date: ""
  };
  const [getFormData, setGetFormData] = useState(initialFormState);
  const fees = Fee.fees;

  const calculateFee = amount => {
    const feeCharge = fees.filter(item => {
      return amount >= item.minAmount && amount <= item.maxAmount;
    });
    return feeCharge[0].feeAmount;
  };

  const handleFormChange = e => {
    setGetFormData({
      ...getFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleOnblur = e => {
    console.log("hello");

    const name = e.target.name;
    const value = e.target.value;
    if (name === "amount" && value < 1) {
      toast.error(`${name} can not be empty`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  const HandleSubmit = value => {
    const { bank, accountNo, amount } = value;
    if (bank === "") {
      return toast.error(`kindly select bank`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    if (accountNo.length < 10 || accountNo.length > 10) {
      return toast.error(`Account number must be 10 digit`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    if (Number(amount) < 1 || Number(amount) > 999999999) {
      return toast.error(
        `Amount must not be less then 1 or greater then 999999999`,
        {
          position: toast.POSITION.TOP_CENTER
        }
      );
    }
    const minFee = { minFee: calculateFee(getFormData.amount) };
    document.getElementById("transactionForm").reset();
    setTransaction({ ...value, ...minFee });
  };

  return (
    <>
      <form onSubmit={() => HandleSubmit(getFormData)} id="transactionForm">
        <div className="form-input">
          <label htmlFor="bank">Bank</label>
          <select name="bank" onChange={handleFormChange}>
            <option value="">Select Bank</option>
            <option value="Access Bank Plc">Access Bank Plc</option>
            <option value="Fidelity Bank Plc">Fidelity Bank Plc</option>
            <option value="First City Monument Bank Limited">
              First City Monument Bank Limited
            </option>
            <option value="First Bank of Nigeria Limited">
              First Bank of Nigeria Limited
            </option>
            <option value="Guaranty Trust Bank Plc">
              Guaranty Trust Bank Plc
            </option>
            <option value="Ecobank Nigeria Plc">Ecobank Nigeria Plc</option>
            <option value="Union Bank of Nigeria Plc">
              Union Bank of Nigeria Plc
            </option>
            <option value="Heritage Banking Company Limited">
              Heritage Banking Company Limited
            </option>
            <option value="Sterling Bank Plc">Sterling Bank Plc</option>
            <option value="Zenith Bank Plc">Zenith Bank Plc</option>
          </select>
        </div>
        <div className="form-input mr">
          <label htmlFor="accountNo">Account Number</label>
          <input
            type="number"
            name="accountNo"
            min="10"
            max="10"
            onBlur={handleOnblur}
            onChange={handleFormChange}
            autoComplete="accountNo"
            placeholder="Beneficiary account Number"
          />
        </div>

        <div className="form-input mr">
          <label htmlFor="amount">Transfer Amount</label>
          <input
            type="number"
            name="amount"
            autoComplete="amount"
            placeholder="Amount"
            onBlur={handleOnblur}
            onChange={handleFormChange}
          />
        </div>
      </form>
      <button onClick={() => HandleSubmit(getFormData)}>Transfer</button>
    </>
  );
}

export default FormData;
