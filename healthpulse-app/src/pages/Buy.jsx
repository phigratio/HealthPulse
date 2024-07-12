import { ethers } from "ethers";
import React, { useState } from "react";
import "../style/dBuy.css";

const Buy = ({ state }) => {
  const [amount, setAmount] = useState(""); // State to hold the amount input
  const [loading, setLoading] = useState(false); // State to track loading status

  const main = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when the transaction starts
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;

    try {
      const amountInWei = ethers.utils.parseEther(amount); // Convert input amount to wei
      const transaction = await contract.main(name, message, {
        value: amountInWei,
      });
      await transaction.wait();
      console.log("Transaction is successful");
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setLoading(false); // Set loading state to false when the transaction ends
      window.location.reload();
    }
  };

  return (
    <>
      <form onSubmit={main}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <input id="message" type="text" required />
        </div>
        <div>
          <label htmlFor="amount">Amount (ETH):</label>
          <input
            id="amount"
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </>
  );
};

export default Buy;
