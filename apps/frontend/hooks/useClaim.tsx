import { useCallback, useState } from "react";
import { useProvider } from "wagmi";
import { ClaimArgs } from "@umbra-collectible/umbra-grant-contract-client";

import { useContractClient } from "../contexts/ContractClientContext";
import { txNotify, notifyUser } from "../utils/alerts";

export const useClaim = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [checkingClaim, setCheckingClaim] = useState(false);
  const { distributor } = useContractClient();
  const provider = useProvider();
  const checkIsClaimed = useCallback(
    async (index: number) => {
      if (!distributor || index < 0) {
        return;
      }
      try {
        setCheckingClaim(true);
        const claimed = await distributor.isClaimed(index);
        setCheckingClaim(false);
        return claimed;
      } catch (err) {
        console.log(err);
        setCheckingClaim(false);
      }
    },
    [distributor]
  );

  const claim = useCallback(
    async ({ index, account, proof }: ClaimArgs) => {
      if (!distributor) {
        return;
      }
      try {
        setIsClaiming(true);
        const tx = await distributor.claim({ index, account, proof });
        await txNotify(tx.hash, provider);
        setIsClaiming(false);
        return true;
      } catch (err) {
        await notifyUser("error", "Failed to claim NFT");
        setIsClaiming(false);
      }
    },
    [distributor, provider]
  );
  return { claim, isClaiming, checkIsClaimed, checkingClaim };
};
