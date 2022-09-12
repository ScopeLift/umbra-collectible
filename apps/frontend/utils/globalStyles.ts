import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100vh;
    min-height: 100%;
    font-size: 62.5%;
    display: block;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    box-sizing: border-box;
  }
    
  body {
    min-height: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: "Montserrat";
    font-size: 1.6rem;
  }

`;

export default GlobalStyle;
