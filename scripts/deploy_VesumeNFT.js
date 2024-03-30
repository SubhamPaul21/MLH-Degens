import { ethers } from 'hardhat';

async function main() {
    const contract = await ethers.getContractFactory("NFT_Contract");
    const token = await contract.deploy("0xF3aa994ba179bf34FF9AcEC8c0F2cBDc027B2f49");
    await token.waitForDeployment();

    console.log("Vesume NFT deployed at: ", await token.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })