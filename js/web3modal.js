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
  // Example Solana wallet setup
  solana: {
     display: {
       name: "Phantom",
       description: "Connect to your Phantom Wallet"
    package: SolanaAdapter,  // Make sure to use the actual adapter you have installed
    options: {
      network: 'mainnet-beta'
    }
  },
   customSolanaWallet: {
    display: {
      name: "Solflare",
      description: "Connect to your Solflare Wallet"
    },
    package: CustomSolanaProvider,  // Your custom provider package
    options: {
      network: "mainnet"  // or 'testnet' or other Solana networks
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
}

async function disconnectWallet() {
  if(provider.close) {
    await provider.close();
  }
  web3Modal.clearCachedProvider();
  provider = null;
  web3 = null;
}
