import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Base from "../components/Base";
import abi from "../contractJson/contracts/health.sol/HealthApp.json";
// import Memos from "./components/Memos";
// import Buy from "./components/Buy";
import Buy from "./Buy.jsx";
import Memos from "./Memo";
// import chai from "./chai.png"; // Ensure the correct path to your image
// import './App.css';
import "../style/dApp.css";
import { toast } from "react-toastify"; 

function Landing() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const initializeBlockchain = async () => {
      const contractAddress = "0xB5b218D1d5BaDE6F09DFe0C3eeC447FCd1a8CFd8"; // Add your contract address here
      const contractABI = abi.abi; // Add your contract ABI here

      try {
        const { ethereum } = window; 

        if (!ethereum) {
        //   alert("Please install Metamask!");
            toast.error("Please install Metamask!");
             window.open(
               "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
               "_blank"
             );


          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(ethereum); // Read data from the blockchain
        const signer = provider.getSigner(); // Sign transactions with the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {
        alert(error.message);
      }
    };

    initializeBlockchain();
  }, []);

  return (
    <div>
      <Base>
        {" "}
        {/* Render the Base component */}
        <div
          style={{
            backgroundColor: "#EFEFEF",
            minHeight: "100vh",
            paddingTop: "80px",
          }}
        >
          {/* <img src={chai} className='img-fluid' alt=".." width='100%' /> */}
          <p
            className="text-muted lead"
            style={{ marginTop: "10px", marginLeft: "5px" }}
          >
            <small>Connected Account - {account}</small>
          </p>
          <div className="container">
            <Buy state={state} />
            <Memos state={state} />
          </div>
        </div>
      </Base>
    </div>
  );
}

export default Landing;
