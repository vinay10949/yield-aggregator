const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

const daiAbi = require('./dai-abi.json');

// Address of DAI contract https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f
const daiMainNetAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

// Address of Join (has auth) https://changelog.makerdao.com/ -> releases -> contract addresses -> MCD_JOIN_DAI
const daiMcdJoin = '0x5D38B4e4783E34e2301A2a36c39a03c45798C4dD';

let addr="0x53940bfDf9D4511dE6177735423c4b0e4Cfb6056";

let daiContract;
let accounts;

web3.eth.getAccounts().then((ganacheAccounts) => {
    accounts = ganacheAccounts;
    daiContract = new web3.eth.Contract(daiAbi, daiMainNetAddress);

    // 1000 DAI
    const numbDaiToMint = web3.utils.toWei('100', 'ether');
    console.log("Account address ",addr);

        return daiContract.methods.transfer(accounts[0], numbDaiToMint)
        .send({
            from: daiMcdJoin,
            gasPrice: web3.utils.toHex(13488477849)
        });
}).then((result) => {
    console.log('DAI mint success');
    console.log("Account address ",addr);
    return daiContract.methods.balanceOf(addr).call();

}).then((balanceOf) => {
    const dai = balanceOf / 1e18;
    console.log('DAI amount in first Ganache account wallet:', dai);
}).catch((err) => {
    console.error(err);
});