const DepositFunds = artifacts.require("DepositFunds");
const Attack = artifacts.require("Attack");

module.exports = async function (deployer) {
  await deployer.deploy(DepositFunds);
  await deployer.deploy(Attack, DepositFunds.address)
};
