    import Web3 from 'https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js';
    import Web3Modal from 'https://cdn.jsdelivr.net/npm/web3modal@latest/dist/web3modal.min.js';
    import WalletConnectProvider from 'https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider/dist/umd/index.min.js';
    import CoinbaseWalletSDK from 'https://cdn.jsdelivr.net/npm/@coinbase/wallet-sdk/dist/index.min.js';
    import Fortmatic from 'https://cdn.jsdelivr.net/npm/fortmatic';
    import Torus from 'https://cdn.jsdelivr.net/npm/@toruslabs/torus-embed/dist/torus.min.js';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'e2c71b288df14e9877b4a6af1d6f571d'  // This will be used to connect to the Ethereum network
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Example",
      infuraId: 'e2c71b288df14e9877b4a6af1d6f571d',
      darkMode: false
    }
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: "YOUR_FORTMATIC_KEY"
    }
  },
  torus: {
    package: Torus,
    options: {}
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", 
  cacheProvider: true,
  providerOptions,
  disableInjectedProvider: false,
});

let web3;
let provider;

async function connectWallet() {
  provider = await web3Modal.connect();
  web3 = new Web3(provider);
  provider.on("accountsChanged", (accounts) => console.log("Accounts Changed", accounts));
  provider.on("chainChanged", (chainId) => console.log("Chain Changed", chainId));
  provider.on("disconnect", (error) => console.log("Disconnected", error));
  return web3;
}; catch (error) {
    console.error("Could not connect to wallet:", error);
  }
}

// Change Network functionality
async function changeNetwork(chainId) {
    try {
        await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: Web3.utils.toHex(chainId) }]});
    } catch (error) {
        console.error('Error changing network:', error);
        if (error.code === 4902) {
            try {
                await provider.request({ method: "wallet_addEthereumChain", params: [/* Network parameters here */]});
            } catch (addError) {
                console.error('Unable to add network:', addError);
            }
        }
    }
}

function disconnectWallet() {
    if (provider?.close) {
        provider.close();
    }
    web3Modal.clearCachedProvider();
    provider = null;
    web3 = null;
}

// Adding Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        const connectWalletButton = document.getElementById('connectWalletButton');
        const disconnectWalletButton = document.getElementById('disconnectWalletButton');

        connectWalletButton?.addEventListener('click', async () => {
        await connectWallet();
        console.log('Wallet connected!');
    });
    disconnectWalletButton?.addEventListener('click', () => {
        disconnectWallet();
        console.log('Wallet disconnected!');
    });
});
export { connectWallet, disconnectWallet, changeNetwork };
