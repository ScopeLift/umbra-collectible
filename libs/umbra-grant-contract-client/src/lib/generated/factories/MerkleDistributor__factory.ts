/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  MerkleDistributor,
  MerkleDistributorInterface,
} from "../MerkleDistributor";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "collectible_",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "merkleRoot_",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collectible",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "isClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "merkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161079538038061079583398101604081905261002f91610045565b6001600160a01b0390911660805260a05261007f565b6000806040838503121561005857600080fd5b82516001600160a01b038116811461006f57600080fd5b6020939093015192949293505050565b60805160a0516106e56100b0600039600081816056015261027b01526000818160b3015261038701526106e56000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80632eb4a7ab146100515780639e34070f1461008b578063ea05a7d0146100ae578063f72d82cf146100fa575b600080fd5b6100787f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020015b60405180910390f35b61009e61009936600461050c565b61010f565b6040519015158152602001610082565b6100d57f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610082565b61010d610108366004610525565b610150565b005b60008061011e610100846105f9565b9050600061012e6101008561060d565b60009283526020839052604090922054600190921b9182169091149392505050565b6101598461010f565b156101eb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f4d65726b6c654469737472696275746f723a2044726f7020616c72656164792060448201527f636c61696d65642e00000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6000848460405160200161022e92919091825260601b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016602082015260340190565b6040516020818303038152906040528051906020012090506102a68383808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152507f000000000000000000000000000000000000000000000000000000000000000092508591506104399050565b610332576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4d65726b6c654469737472696275746f723a20496e76616c69642070726f6f6660448201527f2e0000000000000000000000000000000000000000000000000000000000000060648201526084016101e2565b61033b8561044f565b6040517f40c10f1900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152602482018790527f000000000000000000000000000000000000000000000000000000000000000016906340c10f1990604401600060405180830381600087803b1580156103cb57600080fd5b505af11580156103df573d6000803e3d6000fd5b50506040805188815273ffffffffffffffffffffffffffffffffffffffff881660208201527f6aa3eac93d079e5e100b1029be716caa33586c96aa4baac390669fb5c2a21212935001905060405180910390a15050505050565b600082610446858461048d565b14949350505050565b600061045d610100836105f9565b9050600061046d6101008461060d565b6000928352602083905260409092208054600190931b9092179091555050565b600081815b84518110156104d2576104be828683815181106104b1576104b1610621565b60200260200101516104da565b9150806104ca81610650565b915050610492565b509392505050565b60008183106104f6576000828152602084905260409020610505565b60008381526020839052604090205b9392505050565b60006020828403121561051e57600080fd5b5035919050565b6000806000806060858703121561053b57600080fd5b84359350602085013573ffffffffffffffffffffffffffffffffffffffff8116811461056657600080fd5b9250604085013567ffffffffffffffff8082111561058357600080fd5b818701915087601f83011261059757600080fd5b8135818111156105a657600080fd5b8860208260051b85010111156105bb57600080fd5b95989497505060200194505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082610608576106086105ca565b500490565b60008261061c5761061c6105ca565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036106a8577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea2646970667358221220d23aef6d79ea132309f3749e5acae95f19177f01ff60d3d0f525de8260629ca564736f6c63430008100033";

type MerkleDistributorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MerkleDistributorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MerkleDistributor__factory extends ContractFactory {
  constructor(...args: MerkleDistributorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    collectible_: PromiseOrValue<string>,
    merkleRoot_: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MerkleDistributor> {
    return super.deploy(
      collectible_,
      merkleRoot_,
      overrides || {}
    ) as Promise<MerkleDistributor>;
  }
  override getDeployTransaction(
    collectible_: PromiseOrValue<string>,
    merkleRoot_: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      collectible_,
      merkleRoot_,
      overrides || {}
    );
  }
  override attach(address: string): MerkleDistributor {
    return super.attach(address) as MerkleDistributor;
  }
  override connect(signer: Signer): MerkleDistributor__factory {
    return super.connect(signer) as MerkleDistributor__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MerkleDistributorInterface {
    return new utils.Interface(_abi) as MerkleDistributorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MerkleDistributor {
    return new Contract(address, _abi, signerOrProvider) as MerkleDistributor;
  }
}
