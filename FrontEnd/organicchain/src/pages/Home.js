import React from "react";
import { ethers } from "ethers";
import { Accordion, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ABI from "../artifacts/OrganicChain.json";
import contractAddresses from "../address.json";

function configureContract(address) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, ABI.abi, signer);
    return contract;
  
}

export default function Home() {

	const [myfarms, setmyfarms] = React.useState([]);
  	const [count, setcount] = React.useState(0);

	const getfarms = async () => {
		const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const contract = configureContract(contractAddresses.OrganicChain);
		myfarms.length=0;
		const bal1 = await contract.balance("0xE36eDF9Fcf55662805650738579B16F818861daD");
		console.log(ethers.BigNumber(bal1).toNumber());
		
		const bal2 = await contract.balance("0x43e2a8349817B98dbd86CD0c234Af0461B3bE47E");
		console.log(ethers.BigNumber(bal2).toNumber());

		const tx = await contract.getMyFarms(account[0]);
		console.log(tx);
		for (let i = 0; i < tx.length; i++) {
			
			const farmList = {
				'Area' : tx[i].areaCovered,
				'Crop' : tx[i][1],
				'TokenPercent' : tx[i][2],
			}
			console.log("Value of i: ", i);
			console.log("Value of: [0] ", tx[i][3]);
			console.log("Value of: [1]", tx[i][4]);
			console.log("Value of: [2]", tx[i][5]);

			console.log("Value1 of: [0] ", tx[i].areaCovered);
			console.log("Value1 of: [1]", tx[i].cropName);
			console.log("Value1 of: [2]", tx[i].tokenpercent);
			myfarms.push(farmList);
		}
		//setcount(count+1);
		console.log("myfarms: ",myfarms);
     }

	 React.useEffect(() => {
	 	getfarms();

     }, []);
	

    return (
    	<div className="container">
			<Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>My Farms</Accordion.Header>
					<Accordion.Body>
						<Table striped bordered hover>
							<thead>
								<tr>
								<th>#</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
								</tr>
							</thead>
							<tbody>
								<tr>
								<td>1</td>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
								</tr>
								<tr>
								<td>2</td>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
								</tr>
								<tr>
								<td>3</td>
								<td colSpan={2}>Larry the Bird</td>
								<td>@twitter</td>
								</tr>
							</tbody>
						</Table>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Accordion Item #2</Accordion.Header>
					<Accordion.Body>
					
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
    	</div>
    );
  }