import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colours.beige};
    height: 100vh;
    overflow: hidden;
    padding: 7px 0 0 7px;
    width: 100vw;
  }

  #root {
    display: flex;
    height: 100%;
    width: 100%;
  }
`
