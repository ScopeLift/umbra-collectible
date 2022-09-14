# Frontend

A Next js app for the umbra grant NFT contracts.

## Local Development Setup

In order to run the frontend locally you will need to deploy the umbra-grant-nft-contracts for the chains you plan on using.

### `.env` Variables

Create a `.env` file in the root directory of the package. Be sure to not put this in the `src` folder.

The following environment variables are required:

- `INFURA_API_KEY`: An api key for the infura provider
- `ETHERSCAN_API_KEY`: An etherscan api key used by bnc notify

The below environment variables must exist in the .env but can be set to blank values

- `NEXT_PUBLIC_LOCAL_CONTRACT_ADDRESS`: The merkle distributor contract address on a local blockchain such as anvil.
- `NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS`: The merkle distributor contract address deployed on polygon mumbai.
- `NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS`: The merkle distributor contract address deployed on rinkeby.
- `NEXT_PUBLIC_GOERLI_CONTRACT_ADDRESS`: The merkle distributor contract address deployed on goerli.
- `NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS`: The merkle distributor contract address deployed on polygon.

These environment variables are optional:

- `NEXT_PUBLIC_ENABLE_TESTNETS`: whether to allow testnet chains in rainbowkit

### Running the Apps

Once everything is set up, you'll be able to run the app with the below command.

- `nx run frontend:serve`
  - This runs the frontend locally at `http://localhost:4200`.

### Setting up scripts

There are two scripts one to generate a merkle root and another to upload the NFT to IPFS. They can be run with the below commands.

`nx run frontend:uploadNFT`

This upload command will require an infura project id and secret.

`nx run frontend:generateMerkleRoot`
