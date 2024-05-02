const MMSDK = new MetaMaskSDK.MetaMaskSDK(
      dappMetadata: {
        name: "SHA256 Web3 Harmony",
        url: "window.Sharmadillo256.com",
      },
      infuraAPIKey: process.env.e2c71b288df14e9877b4a6af1d6f571d,
      // Other options.
    )
    // Because the init process of MetaMask SDK is async.
    setTimeout(() => {
      // You can also access via window.ethereum.
      const ethereum = MMSDK.getProvider();

      ethereum.request({ method: 'eth_requestAccounts' });
    }, 0)

const connectAndSign = async () => {
  try {
    const signResult = await sdk?.connectAndSign({
      msg: "Connect + Sign message",
    });
    setResponse(signResult);
  } catch (err) {
    console.warn("failed to connect..", err);
  }
};
