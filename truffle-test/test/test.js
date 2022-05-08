const NFTMarket = artifacts.require("NFTMarket");

contract("NFTMarket", function(accounts) {
    it("Should create Token and execute market sales", async function() {
      let instance = await NFTMarket.deployed();
  
      await instance.createToken("#000000", {from: accounts[0]});
      await instance.createToken("#ffffff", {from: accounts[0]});

      assert.equal(await instance.ownerOf(1), accounts[0]);

      console.log("Contract Address: ", instance.address)

      console.log("Before Sale Owner: ",await instance.ownerOf(1), " is account 0", accounts[0]);
    
      await instance.putNFTOnSale(1, {from: accounts[0], value: 25000000000000000 });
      await instance.putNFTOnSale(2, {from: accounts[0], value: 25000000000000000 });
        
      await instance.finalizeSale(1, {from: accounts[1], value: 1000000000000000000});

      console.log("After Sale Owner: ",await instance.ownerOf(1), " is account 1", accounts[1]);

      assert.equal(await instance.ownerOf(1), accounts[1]);  
    })
  })