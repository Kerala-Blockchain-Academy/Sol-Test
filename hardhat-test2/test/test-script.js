const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create Token and execute market sales", async function () {
    const NFT = await ethers.getContractFactory("NFTMarket");
    const nft = await NFT.deploy();
    await nft.deployed();

    const [account1, account2] = await ethers.getSigners();

    await nft.connect(account1).createToken("#000000");
    await nft.connect(account2).createToken("#ffffff");

    expect(await nft.ownerOf(1)).to.equal(account1.address);

    await nft.connect(account1).putNFTOnSale(1, {value: ethers.utils.parseEther("0.025") });

    await nft.connect(account2).finalizeSale(1, {value: ethers.utils.parseEther("1") });

    expect(await nft.ownerOf(1)).to.equal(account2.address);

  });
});