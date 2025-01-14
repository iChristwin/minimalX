"use client";

import { useEffect, useState } from "react";
import { Web3 } from "web3";
import abi from "@/actions/ABI.json";

export default function Home() {
  const [account, setAccount] = useState("");
  useEffect(() => {
    async function connectToMetaMask() {
      try {
        if (typeof window.ethereum !== "undefined") {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          console.log("Connected to MetaMask:");
          return accounts;
        } else {
          console.error("MetaMask is not available");
          return null;
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        return null;
      }
    }

    connectToMetaMask().then((accounts) => {
      if (accounts) {
        const account = accounts[0];
        setAccount(account);
      } else {
        // Handle the case where MetaMask is not connected or an error occurred
      }
    });
  }, []);
  const getContract = () => {
    let web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x6c4Dcba306cD38B83F9362E907282B58AdD3a403"
    );
    console.log("Contract got");
    return contract;
  };
  async function mintNft() {
    let web3 = new Web3(window.ethereum);
    if (typeof window.ethereum !== "undefined") {
      let res;
      try {
        const contract = getContract();
        res = await contract.methods.safeMint().send({
          from: account,
          value: 0,
          // gas: 800,
          // gasPrice: web3.utils.toWei("50", "gwei"),
        });
      } catch (err) {
        console.error("Mint Operation failed", err);
      }

      return res;
    }
  }
  console.log(account);
  return (
    <div className={`flex w-full h-[100vh] items-center justify-center`}>
      <button
        onClick={() => mintNft()}
        className={`w-[130px] h-[40px] outline-none text-white bg-black rounded-[8px] hover:opacity-75 active:opacity-50`}
      >
        Contract
      </button>
    </div>
  );
}
