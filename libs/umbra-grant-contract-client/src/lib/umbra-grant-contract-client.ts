import { ethers } from "ethers";
import { MerkleDistributor__factory, MerkleDistributor } from "./generated";

export type NetworkConfig = {
  address: string;
  chainId: number;
  name?: string;
};

export type ClaimArgs = {
  index: number;
  account: string;
  proof: ethers.BytesLike[];
};

export class UmbraNFTDistributorContract {
  distributor: MerkleDistributor;

  constructor(
    networkConfig: NetworkConfig,
    provider: ethers.providers.Provider | ethers.Signer
  ) {
    this.distributor = MerkleDistributor__factory.connect(
      networkConfig.address,
      provider
    );
  }

  public async claim(args: ClaimArgs) {
    return await this.distributor.claim(args.index, args.account, args.proof);
  }

  public async isClaimed(id: number) {
    console.log(id);
    return await this.distributor.isClaimed(id);
  }
}
