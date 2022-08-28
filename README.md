# Custom Dashboard

This example demonstrates the thirdweb SDK's capability to deploy any of our [pre-built smart contracts](https://portal.thirdweb.com/pre-built-contracts)!

We use the [`ContractDeployer class`](https://portal.thirdweb.com/typescript/sdk.contractdeployer) and the `deployBuiltInContract` function to deploy the contracts, and use the `sdk.getContractList` to view all the contracts we deployed so far!

This example can be utilized in projects that you want users to deploy smart contracts via your application dynamically, rather than the thirdweb dashboard.

## Tools

- [**thirdweb TypeScript SDK**](https://portal.thirdweb.com/typescript/): to access the [ContractDeployer class](https://portal.thirdweb.com/typescript/sdk.contractdeployer) and view the deployed contracts.

- [**thirdweb React SDK**](https://portal.thirdweb.com/react/): to allow users to connect their wallet to the website using the [useMetamask](https://portal.thirdweb.com/react/react.usemetamask) hook, and view their wallet information using [useAddress](https://portal.thirdweb.com/react/react.useaddress).

## Using This Repo

- Create a project using this example by running:

```bash
npx thirdweb create --template custom-dashboard
```

## Guide

We'll explore the details of how this repository works below.

### Viewing Deployed Contracts

On the [index.tsx](./pages/index.tsx) page, we use the [`.getContractList`](https://portal.thirdweb.com/typescript/sdk.thirdwebsdk.getcontractlist#thirdwebsdkgetcontractlist-method) function to view all the contracts we deployed so far:

```jsx
// Get the signer of the currently connected wallet
const signer = useSigner();

// Instantiate the SDK with the signer
const thirdweb = new ThirdwebSDK(signer);

// Fetch the contracts for this address and set them in state using the SDK
thirdweb.getContractList(address).then((contracts) => {
  // set the contracts in state
  setExistingContracts(contracts);
});
```

### Deploying Contracts

On the [deploy.tsx](./pages/deploy.tsx) page, we use the [`.deployBuiltInContract`] function to deploy a contract, which is a generic function to deploy _any_ pre-built contract.

Typically, you know which contract you want your users to deploy, so it's more helpful to use one of the methods exposed on the [ContractDeployer class](https://portal.thirdweb.com/typescript/sdk.contractdeployer#contractdeployer-class).

Such as:

- [deployNFTDrop](https://portal.thirdweb.com/typescript/sdk.contractdeployer.deploynftdrop)
- [deployToken](https://portal.thirdweb.com/typescript/sdk.contractdeployer.deploytoken)
- [deployMarketplace](https://portal.thirdweb.com/typescript/sdk.contractdeployer.deploymarketplace)

On each of these pages, you can find code examples to help you deploy the contract.

To make the code generic for this example project, we used the `internal` function from the SDK `deployBuiltInContract`, which calls each of these functions under the hood, depending on which contract you pass in as a parameter.

Here's how it looks:

```jsx
const signer = useSigner();

const thirdweb = new ThirdwebSDK(signer);

const contractAddress = await thirdweb.deployer.deployBuiltInContract(
  contractSelected,
  {
    name: `My ${contractSelected}`,
    primary_sale_recipient: address,
    voting_token_address: address,
    description: `My awesome ${contractSelected} contract`,
    // Recipients are required when trying to deploy a split contract
    recipients: [
      {
        address,
        sharesBps: 100 * 100,
      },
    ],
  }
);
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
