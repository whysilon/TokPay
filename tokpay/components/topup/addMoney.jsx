import classes from "./addMoney.module.css";
import React, { useState } from "react";
import axios from "axios";

function AddMoney({ session }) {
  const [inputValue, setInputValue] = useState();
  const [disable, setDisabled] = useState(false);
  const handleInput = (event) => {
    setInputValue(parseInt(event.target.value));
  };
  const [value, setValue] = useState(session.session.user.currentBalance);
  const handleClick = async () => {
    setDisabled(true);
    if (inputValue) {
      //console.log("Before",session.session.user.currentBalance)
      const updatedAmount = session.session.user.currentBalance + inputValue;
      const updateBalance = await axios.patch("/api/updatebalance", {
        newBalance: updatedAmount,
        id: session.session.user.id,
      });
      //console.log("After",updateBalance.data.currentBalance)
      setInputValue("");
      setDisabled(false);
      setValue(updateBalance.data.currentBalance);
      session.session.user.currentBalance = updateBalance.data.currentBalance;
      //console.log("After setValue",session.session.user.currentBalance);
    }
  };
  return (
    <div className={classes.layout}>
      <p>Current value: {value}</p>
      <input
        type="number"
        value={inputValue}
        onChange={handleInput}
        placeholder="Enter number here..."
      />
      <button onClick={handleClick} disabled={disable}>
        Update Value
      </button>
    </div>
  );
}

export default AddMoney;
