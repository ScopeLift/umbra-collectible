# Umbra Collectible

A monorepo for the Umbra collectible NFT and frontend.

### Packages

| App                                                            |
| -------------------------------------------------------------- |
| [Frontend](./apps/frontend)                                    |
| [Contracts](./apps/umbra-grant-nft-contract)                   |
| [Contract Client Library](./libs/umbra-grant-contract-client/) |

## Getting Started

Our monorepo uses [Nx](https://nx.dev/) as a build system and for scaffolding. If this your first time using Nx, you'll have to install it globally on your system or run the below commands with yarn nx or npx nx:
`npm install -g nx`

Here is a basic guide. Each package README (and `project.json`) will have more details about commands within each package.

```bash

`git clone https://github.com/ScopeLift/umbra-collectible.git` or `git@github.com:ScopeLift/umbra-collectible.git`
# clone the entire monorepo at the top level on the develop branch
`yarn install`
# run yarn to install all of the packages and dependencies

```

Once cloned and everything is installed, you'll be able to run each package! Package-level commands are run with `nx run` instead of `yarn` -- this may be new if you're used to working in a different monorepo structure. Each package has similar command structure, but some packages have additional commands.

The package-level commands can be found in each package's `project.json`.

```bash

# run a specific package locally

nx run app-name:serve

# example to run the frontend app:

nx run frontend:serve

# lint a specific package

nx run app-name:lint

# example to lint the frontend app:

nx run frontend:lint

# build a specific package:

nx run app-name:build

# example to build the frontend app:

nx run frontend:build

```
