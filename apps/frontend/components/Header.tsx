import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";

const StyledHeader = styled.header`
  max-width: ${({ theme }) => `${theme.page.maxSize}`};
  display: flex;
  grid-area: header;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  h2 {
    display: none;

    @media ${({ theme }) => `${theme.devices.md}`} {
      display: block;
      color: ${({ theme }) => `${theme.colors.primary}`};
      font-weight: ${({ theme }) => `${theme.text.weight.extraBold}`};
      font-size: 3.2rem;
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <LogoContainer>
        <Image
          src="/favicon-128x128.png"
          alt="Umbra cash logo"
          height="50px"
          width="50px"
          layout="fixed"
        />
        <h2>Umbra Collectible</h2>
      </LogoContainer>
      <ConnectButton />
    </StyledHeader>
  );
};

export default Header;
