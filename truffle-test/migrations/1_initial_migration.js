const Migrations = artifacts.require("NFTMarket");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
