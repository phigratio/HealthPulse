const hre = require("hardhat");

async function main() {
  // Fetching the byte code and ABI
  const Health = await hre.ethers.getContractFactory("HealthApp");

  // Deploying an instance of our smart contract
  const health = await Health.deploy();

  // Waiting for the contract to be deployed
  // await chai.deployed();
  // Waiting for the contract to be deployed
  await health.waitForDeployment();

  console.log("Deployed contract address:", await health.getAddress());

  // console.log("Deployed contract address:", chai.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//contract address 0xB5b218D1d5BaDE6F09DFe0C3eeC447FCd1a8CFd8
