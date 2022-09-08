import { useEffect, useCallback, useState } from "react";
import { useContractClient } from "../contexts/ContractClientContext";
import { ClaimArgs } from "@umbra-collectible/umbra-grant-contract-client";

export const useClaim = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const { distributor } = useContractClient();
  const checkIsClaimed = useCallback(
    async (index: number) => {
      if (!distributor) {
        return;
      }
      try {
        return await distributor.isClaimed(index);
      } catch (err) {
        console.log(err);
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
        tx.wait(1);
        setIsClaiming(false);
      } catch (err) {
        setIsClaiming(false);
      }
    },
    [distributor]
  );
  return { claim, isClaiming, checkIsClaimed };
};
