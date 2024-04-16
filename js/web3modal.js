import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Fortmatic from 'fortmatic';
import Torus from '@toruslabs/torus-embed';
import CustomSolanaProvider from './CustomSolanaProvider';

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
      infuraId: 'e2c71b288df14e9877b4a6af1d6f571d'
  rpc: "", // optional
      chainId: 1, // optional
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
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // default network - can be changed by the user
  cacheProvider: true,
  providerOptions,
  disableInjectedProvider: false,
});

let web3;
let provider;

async function connectWallet() {
  provider = await web3Modal.connect();
  web3 = new Web3(provider);

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

async function disconnectWallet() {
  if(provider.close) {
    await provider.close();
  }
  web3Modal.clearCachedProvider();
  provider = null;
  web3 = null;
}
