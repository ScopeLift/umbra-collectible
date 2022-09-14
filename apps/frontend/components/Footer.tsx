import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  grid-area: footer;
  margin: 1rem 1rem 0 1rem;
  justify-content: space-between;
  font-size: 1.2rem;

  h3 {
    letter-spacing: 0.4rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1.6rem;

    svg {
      margin-right: 1.6rem;
      font-size: 1.8rem;
      color: black;
    }

    a {
      display: flex;
      align-items: center;
    }
  }

  @media ${({ theme }) => `${theme.devices.md}`} {
    justify-content: flex-start;
    margin: 3rem 3rem 0 3rem;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 1rem;
  }

  @media ${({ theme }) => `${theme.devices.md}`} {
    margin-right: 8rem;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ItemContainer>
        <h3>About</h3>
        <span>
          Built by <a href="https://www.scopelift.co/">ScopeLift</a> for
          supporters of Umbra&apos;s{" "}
          <a href="https://gitcoin.co/grants/821/umbra-privacy-preserving-stealth-payments">
            Gitcoin Grant
          </a>
        </span>
        <span>
          Visit the <a href="https://app.umbra.cash/">Umbra App</a>
        </span>
      </ItemContainer>
    </StyledFooter>
  );
};

export default Footer;
