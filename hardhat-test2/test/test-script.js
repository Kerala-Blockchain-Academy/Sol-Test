const { expect } = require("chai");

describe("NFTMarket", function (accounts) {
    it("Should create Token and execute market sales", async function () {
        const [owner, addr1] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("NFTMarket");

        const hardhatToken = await Token.deploy();

        await hardhatToken.connect(owner).createToken("#000000");
        await hardhatToken.connect(owner).createToken("#ffffff");

        expect(await hardhatToken.ownerOf(1)).to.equal(owner.address);

        console.log("Before Sale Owner: ", await hardhatToken.ownerOf(1), " is account owner", owner.address);

        const listingPrice = ethers.utils.parseEther("0.025");
        
        await hardhatToken.connect(owner).putNFTOnSale(1, { value: listingPrice });
        await hardhatToken.connect(owner).putNFTOnSale(2, { value: listingPrice });

        const purchaseValue = ethers.utils.parseEther("1");

        await hardhatToken.connect(addr1).finalizeSale(1, { value: purchaseValue });

        console.log("After Sale Owner: ", await hardhatToken.ownerOf(1), " is account 1", addr1.address);

        expect(await hardhatToken.ownerOf(1)).to.equal(addr1.address);
    })
})
