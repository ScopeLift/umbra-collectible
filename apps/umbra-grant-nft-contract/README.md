# Umbra Grant NFT Contract

An NFT and Merkle distributor contract for the Umbra Grant NFT.

## Local Development Setup

In order to build, test and run these contracts you will need to install foundry.

### Setting up Foundry

```sh
curl -L https://foundry.paradigm.xyz | bash # install foundryup binary
foundryup # install Foundry
```

### `.env` Variables

Create a `.env` file in the root directory of the package. Be sure to not put this in the `src` folder.

Each of the following environment variables are required in order to deploy the contracts to those blockchains:

- `LOCAL_PRIVATE_KEY`: private key to a local wallet
- `MUMBAI_PRIVATE_KEY`: private key to a mumbai wallet
- `RINKEBY_PRIVATE_KEY`: private key to a rinkeby wallet
- `GOERLI_PRIVATE_KEY`: private key to a goerli wallet
- `POLYGON_PRIVATE_KEY`: private key to a polygon wallet

### Local development commands

All of these commands should be run from the root directory. If there are missing commands forge can be used directly in the umbra-grant-nft-contract directory.

- `nx run umbra-grant-nft-contract:build`
  - Build the contracts
- `nx run umbra-grant-nft-contract:install`
  - Install all dependencies
- `nx run umbra-grant-nft-contract:add --package <depenency>`
  - Add a new dependency
- `nx run umbra-grant-nft-contract:deploy:<chain>`
  - Deploy contracts to that chain. Options include local, mumbai, rinkeby, etc...
- `nx run umbra-grant-nft-contract:test`
  - Run contract tests
- `nx run umbra-grant-nft-contract:clean`
  - Run forge clean
