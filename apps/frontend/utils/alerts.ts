import { Provider } from "@ethersproject/providers";
import BNotify, { InitOptions, NotificationType } from "bnc-notify";

import { getEtherscanUrl } from "./networks";

// The code in this file is based off the below file
//
// https://github.com/ScopeLift/umbra-protocol/blob/26b0a5c8812f6d650b26e16195d3009f1fe36c96/frontend/src/utils/alerts.ts
const bNotifyOptions = {
  desktopPosition: "topRight",
  networkId: 1,
} as InitOptions;
const defaultTimeout = 5000; // 4 seconds

// @notice Present notification alert to the user
// @param color Alert color, choose positive, negative, warning, info, or others
// @param message Message to display on notification
export function notifyUser(alertType: NotificationType, message: string) {
  const bNotify = BNotify(bNotifyOptions);
  bNotify.notification({
    autoDismiss: alertType === "error" ? 10000 : defaultTimeout,
    eventCode: "userNotify",
    message,
    type: alertType,
  });
}

export async function txNotify(txHash: string, provider: Provider) {
  // Instantiate pending transaction notification
  const { chainId } = await provider.getNetwork();
  const onclick = () => window.open(getEtherscanUrl(txHash, chainId), "_blank");
  const bNotify = BNotify(bNotifyOptions);
  const { update } = bNotify.notification({
    autoDismiss: 0,
    eventCode: "txPending",
    message: "Transaction pending",
    onclick,
    type: "pending",
  });

  // Update notification based on transaction status
  const { status } = await provider.waitForTransaction(txHash);
  update({
    autoDismiss: defaultTimeout,
    eventCode: status ? "txSuccess" : "txFail",
    message: status ? "Transaction succeeded" : "Transaction failed",
    onclick,
    type: status ? "success" : "error",
  });
}
