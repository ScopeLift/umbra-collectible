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
  max-width: 5rem;
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
        />
      </LogoContainer>
      <ConnectButton />
    </StyledHeader>
  );
};

export default Header;
