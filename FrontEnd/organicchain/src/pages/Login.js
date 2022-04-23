import React, { useState}  from "react";
import {  Spinner } from 'react-bootstrap';
import  Web3  from "web3";
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

const Login = ({setUser, setUserRole, setUserAddr}) => {

    const [userAddress, setuserAddress] = useState('');
    const [useraccount, setuseraccount] = useState('');
    const [butonlabel, setbutonlabel] = useState('Sign Up');
    const [userName, setuserName] = useState('');
    const [userRole, setuserRole] = useState('FARMER');
    const [isloading, setisloading] = useState(false);
    
    
    React.useEffect( () => {

        async function checkuser(){
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setuseraccount(account[0]);
            const contract = configureContract(contractAddresses.OrganicChain);
            console.log(useraccount);
            contract.searchUser(account[0]).then((response) =>{
                if(response[0])
                {
                    setbutonlabel('Log In');
                }    
                else{
                }
            });
        } 
        checkuser();
    }, [useraccount]);

 
    async function handleLogin(e) {
        e.preventDefault();
        alert("Handling login" +userName+ userRole);
        alert(contractAddresses.OrganicChain);
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(userAddress);
        const contract = configureContract(contractAddresses.OrganicChain);
        console.log(contract);
        const tx = await contract.searchUser(account[0]);
        console.log("Transaction: ",tx);
        contract.searchUser(account[0]).then((response) =>{
            console.log("Transaction done");
            console.log(response);
            if(response[0])
            {
                alert("User Exists Loggin In");
                setUser(response[1].name);
                setUserRole(response[1].role);
                console.log("Setting addr");
                setUserAddr(userAddress);
            }    
            else{
                alert("Creating user",userName);
                setisloading(true);
                contract.createUser(userName,account[0],userRole).then((response) =>{
                    alert("User Created");
                    setisloading(false);
                });
            }
        });
    }

    return ( 
        <div className="App">
            {isloading && 
                <Spinner animation="border" role="status" variant="light">
                </Spinner>
            } 
            <div className='App-header'> 
					<table>
                        <tbody>
                            <tr>
                                <th className='org-name'>Organic Chain </th>
                                <th className="User-display">
                                </th>
                                <th>
                                </th>
                            </tr>
                        </tbody>
					</table>
				</div>
            <div className="container">
                <div className="input-form">
                    <form  onSubmit={handleLogin}>
                        <div className="input-container">
                            <label>Name </label>
                            <input className="input-box"  type="text" value = {userName} required onChange={(e) => setuserName(e.target.value)}/>
                        </div>
                        {/* <div className="input-container">
                            <label>User Address </label>
                            <input className="input-box"  type="text" value = {userAddress} required onChange={(e) => setuserAddress(e.target.value)}/>
                        </div> */}
                        <div className="input-container">
                        <label>Role </label>
                            <select className="input-box" value={userRole} required onChange={(e) => setuserRole(e.target.value)}>
                                <option value="FARMER">Farmer</option>
                                <option value="INVESTOR">Investor</option>
                                <option value="CONSUMER">Consumer</option>
                            </select>
                        </div>
                        <div className="button-container">
                            <input className="Submit" type="submit" value={butonlabel} />
                        </div>
                    </form>    
                </div>
            </div>
        </div>
     );
}
 
export default Login;