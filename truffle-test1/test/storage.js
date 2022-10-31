const Storage = artifacts.require("Storage");


contract("Storage", function (accounts) {
  it("Deployment should be correct", async function () {
    await Storage.deployed();
    return assert.isTrue(true);
  });

  it("Store and Retrive testing", async function () {
    let instance = await Storage.deployed();
    await instance.store(47, {from: accounts[0]});

    assert.equal(await instance.retrieve(), 47);
  });

});
