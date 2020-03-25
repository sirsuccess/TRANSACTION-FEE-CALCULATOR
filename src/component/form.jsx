import React, { useState } from "react";
import { toast } from 'react-toastify';

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

  const handleForm = e => {
    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_CENTER
    });
    setGetFormData({
      ...getFormData,
      [e.target.name]: e.target.value
    });
  };

  const HandleSubmit = value => {
    const minFee = { minFee: calculateFee(getFormData.amount) };
    setTransaction({ ...value, ...minFee });
  };

  return (
    <>
      <form onSubmit={() => HandleSubmit(getFormData)}>
        <div className="form-input">
          <label htmlFor="bank">Bank</label>
          <select name="bank" onChange={handleForm}>
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
            onChange={handleForm}
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
            onChange={handleForm}
          />
        </div>
      </form>
      <button onClick={() => HandleSubmit(getFormData)}>Transfer</button>
    </>
  );
}

export default FormData;
