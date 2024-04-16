    import Web3 from 'https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js';
    import Web3Modal from 'https://cdn.jsdelivr.net/npm/web3modal@latest/dist/web3modal.min.js';
    import WalletConnectProvider from '@walletconnect/web3-provider';
    import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
    import Fortmatic from 'fortmatic';
    import Torus from '@toruslabs/torus-embed';

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
      appName: "SHA256-Web3-Harmony",
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

export async function connectWallet() {
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);

  provider.on("accountsChanged", (accounts) => {
    console.log("Accounts Changed", accounts);
  });

  provider.on("chainChanged", (chainId) => {
    console.log("Chain Changed", chainId);
  });

  provider.on("disconnect", (error) => {
    console.log("Disconnected", error);
  });

  } catch (error) {
    console.error("Could not connect to wallet:", error);
  }

return web3;
}

// Change Network functionality
async function changeNetwork(chainId) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(chainId) }]
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        // This network is not added to the wallet yet, attempt to add it
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [/* Network parameters for the network to be added */],
        });
      } catch (addError) {
        console.error('Unable to add network:', addError);
      }
    }
    console.error('Error changing network:', error);
  }
}

export function disconnectWallet() {
  if(provider && provider.close) {
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

        if (connectWalletButton) {
            connectWalletButton.addEventListener('click', connectWallet);
        }
        if (disconnectWalletButton) {
            disconnectWalletButton.addEventListener('click', disconnectWallet);
        }

        // Add similar event listeners for other buttons
    });

    window.connectWallet = connectWallet;
    window.disconnectWallet = disconnectWallet;
    // and so on for other functions...

  } catch (error) {
    console.error("Error setting up web3 modal:", error);
}
