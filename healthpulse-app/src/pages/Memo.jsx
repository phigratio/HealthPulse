import React, { useState, useEffect } from "react";
import "../style/dApp.css"; // Import your CSS file

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const { contract } = state;
        if (!contract) return;

        const memos = await contract.getMemos();

        // Assuming memos is an array of objects with name, message, timestamp, and from properties
        setMemos(memos);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    fetchMemos();
  }, [state]);

  return (
    <div>
      {memos.map((memo, index) => (
        <div key={index} className="memo">
          <p>Name: {memo.name}</p>
          <p>Message: {memo.message}</p>
          <p>Timestamp: {new Date(memo.timestamp * 1000).toLocaleString()}</p>
          <a
            href={`https://sepolia.etherscan.io//address/${memo.from}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-black text-base">From: {memo.from}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Memos;
