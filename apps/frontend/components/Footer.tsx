import { BsDiscord, BsGithub } from "react-icons/bs";
import { GrTwitter, GrMail } from "react-icons/gr";
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

  a {
    color: #8a6302;
    text-decoration: underline;
  }

  @media ${({ theme }) => `${theme.devices.md}`} {
    justify-content: flex-start;
    margin: 3rem 3rem 0 3rem;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

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
          Built by <a href="https://www.scopelift.co/">ScopeLift</a>
        </span>
      </ItemContainer>
      <ItemContainer>
        <h3>Links</h3>
        <p>
          <a href="https://twitter.com/UmbraCash">
            <GrTwitter />
            <span>Twitter</span>
          </a>
        </p>
        <p>
          <a href="https://discord.com/invite/uw4y5J2p7C">
            <BsDiscord />
            <span>Discord</span>
          </a>
        </p>
        <p>
          <a href="https://github.com/ScopeLift/umbra-protocol">
            <BsGithub />
            <span>Github</span>
          </a>
        </p>
        <p>
          <a href="mailto:support@umbra.cash">
            <GrMail />
            <span>support@umbra.cash</span>
          </a>
        </p>
      </ItemContainer>
    </StyledFooter>
  );
};

export default Footer;
