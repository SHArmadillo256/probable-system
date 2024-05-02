<head>
  ...
  <script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>
  <script>
    const MMSDK = new MetaMaskSDK.MetaMaskSDK(
      dappMetadata: {
        name: "Example Pure JS Dapp",
        url: window.location.href,
      },
      infuraAPIKey: process.env.INFURA_API_KEY,
      // Other options.
    )
    // Because the init process of MetaMask SDK is async.
    setTimeout(() => {
      // You can also access via window.ethereum.
      const ethereum = MMSDK.getProvider();

      ethereum.request({ method: 'eth_requestAccounts' });
    }, 0)
  </script>
  ...
</head>