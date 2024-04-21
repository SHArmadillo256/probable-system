// web3connectsolana.js
import { Connection, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';

export const getWeb3 = () => {
    const network = clusterApiUrl('devnet');
    const connection = new Connection(network, 'confirmed');

    // Function to get the provider
    const getProvider = () => {
        if ("solana" in window) {
            const provider = window.solana;
            if (provider.isPhantom) {
                return provider;
            }
        }
        window.alert('Solana object not found! Get a Phantom Wallet 👻');
    };

    // Function to connect the wallet
    const connectWallet = async () => {
        const provider = getProvider();
        if (!provider) return;
        try {
            await provider.connect();
            return provider.publicKey.toString();
        } catch (error) {
            console.error('Wallet connect error:', error);
        }
    };

    // Function to send a transaction
    const sendTransaction = async (publicKey, destination, amount) => {
        const provider = getProvider();
        if (!provider) return;

        if (!provider.connected) {
            throw new WalletNotConnectedError();
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(publicKey),
                toPubkey: new PublicKey(destination),
                lamports: amount,
            })
        );

        try {
            const signature = await provider.signAndSendTransaction(transaction);
            await connection.confirmTransaction(signature, 'confirmed');
            return signature;
        } catch (error) {
            console.error('Transaction error:', error);
        }
    };

    return {
        connectWallet,
        sendTransaction
    };
};
