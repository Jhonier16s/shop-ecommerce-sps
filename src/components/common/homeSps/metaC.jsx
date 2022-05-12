import React, {useState} from "react";

const metaC = () => {

 /* getAccount(); */
 const [metaAccount, setMetaAccount] = useState("");

  return (
    <>
      <div>
        <button
          className="justify-center w-full flex pb-2"
          onClick={() => callMetamask()}
        >
         <img src="/assets/images/banner/metalogo.jpg" alt="" width="30px" height="30px"/>
        </button>
        <h4>{metaAccount}</h4>
      </div>
    </>
  );



  // Web3 functions
async function callMetamask() {
  if (typeof window.ethereum !== "undefined") {
    //console.log('MetaMask is installed!');
    getAccount();
    if (window.ethereum.networkVersion !== "56") {
      // 56 es la default para Binance
      changeNetwork();
    }
  } else {
    alert("Necesitas instalar MetaMask");
  }
}

async function getAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];
  setMetaAccount(account.substring(0, 5) + "..." + account.slice(-5));
  /* console.log(account); */
}

async function changeNetwork() {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x38",
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        chainName: "Smart Chain",
        nativeCurrency: {
          name: "Sparklife SPS",
          symbol: "SPS",
          decimals: 18,
        },
        blockExplorerUrls: ["https://bscscan.com"],
      },
    ],
  });
}



};


export default metaC;
