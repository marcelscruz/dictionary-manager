import { createGlobalStyle } from 'styled-components/macro'
import { colours } from 'utils/theme'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: ${colours.beige};
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
