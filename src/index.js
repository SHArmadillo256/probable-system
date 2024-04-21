// src/index.js
const ethers = require('ethers');
const wagmi = require('wagmi');
const web3ModalLib = require('@web3modal/wagmi');

const {
    createClient,
    CoinbaseWalletConnector,
    WalletConnectConnector,
    TorusConnector,
    InjectedConnector,
    defaultChains,
    publicProvider
} = wagmi;

const { createWeb3Modal } = web3ModalLib;

const client = createClient({
    autoConnect: true,
    connectors: () => [
        new CoinbaseWalletConnector({ chains: defaultChains }),
        new WalletConnectConnector({
            chains: defaultChains,
            options: {
                qrcode: true,
                rpc: { 1: 'https://mainnet.infura.io/v3/e2c71b288df14e9877b4a6af1d6f571d' }
            }
        }),
        new TorusConnector({ chains: defaultChains }),
        new InjectedConnector({ chains: defaultChains })
        
        /* Define connectors here */
      ],
       provider: publicProvider()
});

const web3Modal = createWeb3Modal({ client });

window.connectWallet = async function() {
    try {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log('Connected', { signer });
  } catch (error) {
    console.error('Could not connect to wallet:', error);
  }
};

window.disconnectWallet = async function() {
    try {
        await web3Modal.disconnect();
        console.log('Disconnected');
    } catch (error) {
        console.error('Could not disconnect wallet:', error);
    }
};

window.switchNetwork = async function(chainId) {
    try {
        await web3Modal.switchNetwork(chainId);
        console.log('Network switched');
    } catch (error) {
        console.error('Could not switch network:', error);
    }
};
