import React, { useCallback, useState } from "react";
import { networks } from "../utils/networks";
import { useContractClient } from "../contexts/ContractClientContext";
import { ClaimArgs } from "@umbra-collectible/umbra-grant-contract-client";

export const useClaim = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const { distributor } = useContractClient();
  const claim = useCallback(
    async ({ index, account, proof }: ClaimArgs) => {
      console.log("distributor");
      console.log(distributor);
      if (!distributor) {
        return;
      }
      try {
        setIsClaiming(true);
        console.log(index);
        const tx = await distributor.claim({ index, account, proof });
        tx.wait(1);
        setIsClaiming(false);
      } catch (err) {
        // TODO: pop toast
        console.log(err);
      }
    },
    [distributor]
  );
  return { claim, isClaiming };
};
