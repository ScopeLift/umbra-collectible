import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export function Index() {
  return (
    <StyledPage>
      <h1>Connect wallet to claim Umbra NFT</h1>
      <ConnectButton />
    </StyledPage>
  );
}

export default Index;
