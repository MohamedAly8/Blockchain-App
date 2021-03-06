// Importing tokens
// eslint-disable-next-line no-undef
const DappToken = artifacts.require('DappToken')
// eslint-disable-next-line no-undef
const DaiToken = artifacts.require('DaiToken')
// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require('TokenFarm')

// async keyword: since we want to do step by step procedures
// accounts from Ganache
module.exports = async function(deployer, network, accounts) {
    // Deploy Mock DAI Token
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()

    // Deploy  Dapp Token
    await deployer.deploy(DappToken)
    const dappToken = await DappToken.deployed()
    
    // Deploy TokenFarm
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    // Transfer all tokens to TokenFarm (1 million)

    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

    // Transfer 100 mock DAI to investor, second account
    await daiToken.transfer(accounts[1], '100000000000000000000')
}
