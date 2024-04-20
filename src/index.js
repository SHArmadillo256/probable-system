// src/index.js
const ethers = require('ethers');
const wagmi = require('wagmi');
const web3ModalLib = require('@web3modal/wagmi');

const { createClient, configureChains, defaultChains, publicProvider } = wagmi;
const { createWeb3Modal } = web3ModalLib;

const client = createClient({
    autoConnect: true,
    connectors: () => [
        /* Define connectors here */
      ]
});

const web3Modal = createWeb3Modal({ client });

async function connectWallet() {
  try {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log('Connected', { signer });
  } catch (error) {
    console.error('Could not connect to wallet:', error);
  }
}

async function disconnectWallet() {
    try {
        await web3Modal.disconnect();
        console.log('Disconnected');
    } catch (error) {
        console.error('Could not disconnect wallet:', error);
    }
}

async function switchNetwork(chainId) {
    try {
        await web3Modal.switchNetwork(chainId);
        console.log('Network switched');
    } catch (error) {
        console.error('Could not switch network:', error);
    }
}

global.connectWallet = connectWallet;
global.disconnectWallet = disconnectWallet;
global.switchNetwork = switchNetwork;

