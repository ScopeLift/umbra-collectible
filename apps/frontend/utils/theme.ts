export const theme = {
  page: {
    maxSize: "102.3rem",
  },
  buttons: {
    size: {
      xl: {
        height: "6.2rem",
      },
      lg: {
        height: "4.8rem",
      },
      md: {
        height: "4.8rem",
        width: "14.4rem",
      },
      sm: {
        height: "2.6rem",
      },
    },
  },
  devices: {
    sm: `(min-width: 480px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 1024px)`,
    xl: `(min-width: 1200px)`,
  },
  colors: {
    primary: "#d69903",
    primaryReg: "#FCBF29",
    primaryLight: "#FEDB41",
    secondary: "#26A69A",
    accent: "#9C27B0",
    dark: "#1D1D1D",
    light: "#E2E2E2",
    darkGrey: "#767171",
    lightGrey: "#D0CECE",
    positive: "#21BA45",
    negative: "#C10015",
    info: "#31CCEC",
    warning: "#F2C037",
  },
  fonts: {
    fontFamily: `'Montserrat'`,
  },
  text: {
    weight: {
      bold: "700",
      semibold: "600",
      normal: "400",
    },
    size: {
      lg: {
        fontSize: "2.0rem",
        lineHeight: "2.4rem",
      },
      md: {
        fontSize: "1.8rem",
        lineHeight: "2.4rem",
      },
      base: {
        fontSize: "1.6rem",
        lineHeight: "2.2rem",
      },
      sm: {
        fontSize: "1.4rem",
        lineHeight: "1.8rem",
      },
      xs: {
        fontSize: "1.2rem",
        lineHeight: "1.6rem",
      },
      xxs: {
        fontSize: "1rem",
        lineHeight: "1.4rem",
      },
    },
  },
  title: {
    xxxl: {
      fontSize: "9.6rem",
      lineHeight: "10.2rem",
      fontWeight: 900,
    },
    xxl: {
      fontSize: "7.2rem",
      lineHeight: "8.8rem",
      fontWeight: 900,
    },
    xl: {
      fontSize: "5.6rem",
      lineHeight: "6.2rem",
      fontWeight: 700,
    },
    lg: {
      fontSize: "4.8rem",
      lineHeight: "5.2rem",
      fontWeight: 700,
    },
    md: {
      fontSize: "3.2rem",
      lineHeight: "3.8rem",
      fontWeight: 600,
    },
    sm: {
      fontSize: "2.4rem",
      lineHeight: "2.8rem",
      fontWeight: 600,
    },
  },
};

export type Theme = typeof theme;
export type ThemeButtonSize = keyof Theme["buttons"]["size"];
