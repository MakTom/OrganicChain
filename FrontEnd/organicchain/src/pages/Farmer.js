import React, { useState}  from "react";
import { ethers } from "ethers";
import 'bootstrap/dist/css/bootstrap.min.css';
import ABI from "../artifacts/OrganicChain.json";
import contractAddresses from "../address.json";

function configureContract(address) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    return contract;
  
}

export default function Farmer() {
    const [area, setarea] = useState('');
    const [crop, setcrop] = useState('');
    const [tokenPercent, settokenPercent] = useState('');

    async function handleclear(e) {
        e.preventDefault();
        alert("Handling clear");
        setarea('');
        setcrop('');
        settokenPercent('');
    }

    async function handlesubmit(e) {
        e.preventDefault();
        alert(contractAddresses.OrganicChain);
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const contract = configureContract(contractAddresses.OrganicChain);
        console.log(contract);
        contract.addFarm(account[0],area,crop,tokenPercent).then((response) =>{
            console.log("Transaction done");
            console.log(response.wait().then((res) =>{
                console.log("Waiting",res);
            }));
        });
    }


  return (
    <div className="container">
            <form className="input-form" onSubmit={handlesubmit}>
            <div className="input-container">
                <label className="label">Area </label>
                <input className="input-box"  type="text" value = {area} required onChange={(e) => setarea(e.target.value)}/>
            </div>
            <div className="input-container">
                <label className="label">Crop </label>
                <input className="input-box"  type="text" value = {crop} required onChange={(e) => setcrop(e.target.value)}/>
            </div>
            <div className="input-container">
                <label className="label1">Token Percent </label>
                <input className="input-box"  type="text" value = {tokenPercent} required onChange={(e) => settokenPercent(e.target.value)}/>
            </div>
            <div className="input-button">
                <input className="Submit" type="button" value="Clear" onClick={handleclear}/>
                <input className="Submit" type="submit" value="Submit" />
            </div>
        </form>
    </div>

  )
}