import styled from 'styled-components/macro'
import { colours, fonts } from 'utils/theme'

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
`

export const Overlay = styled.div`
  background: black;
  height: 100vh;
  left: 0;
  opacity: 0.7;
  position: absolute;
  top: 0;
  width: 100vw;
`

export const DialogBox = styled.div`
  align-items: center;
  background: ${colours.beige};
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: space-between;
  padding: 40px;
  width: 400px;
  z-index: 1;
`

export const Text = styled.h3`
  color: ${colours.purple};
  font-family: ${fonts.primary};
  letter-spacing: 0.3px;
  margin: 0;
`

export const ButtonsContainer = styled.div``

export const Button = styled.button`
  background: ${({ colour }) => colour};
  cursor: pointer;
  color: ${colours.beige};
  font-family: ${fonts.primary};
  margin: 0 10px;
  padding: 10px 15px;
  width: 100px;
`
