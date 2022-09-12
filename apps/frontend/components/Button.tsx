import { HTMLAttributes } from "react";
import styled from "styled-components";
import { ThemeButtonSize } from "../utils/theme";

type Props = {
  size: ThemeButtonSize;
  disabled: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<{ size: ThemeButtonSize }>`
  line-height: 1.715em;
  background: ${({ theme }) => `${theme.colors.primary}`};
  color: white;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}`};
  border-radius: 5px;
  height: ${({ theme, size }) => `${theme.buttons.size[size].height}`};
  width: ${({ theme, size }) => `${theme.buttons.size[size].width}`};
  font-size: ${({ theme, size }) => `${theme.text.size[size].fontSize}`};
  font-weight: ${({ theme, size }) => `${theme.text.weight.semibold}`};
  cursor: pointer;

  :hover {
    filter: brightness(105%);
  }

  :disabled {
    filter: brightness(100%);
    cursor: not-allowed;
  }
`;

const Button = ({ size, children, ...rest }: Props) => {
  return (
    <StyledButton size={size} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
