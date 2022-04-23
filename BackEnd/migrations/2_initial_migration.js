const fs = require('fs');
const OrganicChain = artifacts.require("OrganicChain");
const OCToken = artifacts.require("OCToken");

module.exports = async function (deployer) {
	

 	await deployer.deploy(OrganicChain);
	await deployer.deploy(OCToken,"OrganicChain","OCT");
	const data = {
			"OrganicChain": OrganicChain.address,
			"OCToken" : OCToken.address,
		};
		fs.writeFileSync('../FrontEnd/organicchain/src/address.json', JSON.stringify(data), (err) => {
			if (err)
				console.log(err);
			else {
				console.log("File written successfully\n");
			}
		});


};