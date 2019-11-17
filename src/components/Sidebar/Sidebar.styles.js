import styled, { css, keyframes } from 'styled-components/macro'
import { colours, fonts } from 'utils/theme'

export const Sidebar = styled.nav``

export const Title = styled.h1`
  color: ${colours.beige};
  font-family: ${fonts.primary};
  font-size: 3.5em;
  letter-spacing: 1.5px;
  line-height: 55px;
  margin-top: 0;
  margin-bottom: 60px;
`

export const ButtonsContainer = styled.div`
  position: relative;
`

const addBorderColour = keyframes`
  40% {
    border-color: ${colours.purple};
  }

  100% {
    border-color: ${colours.purple};
  }
`

const slideIn = keyframes`
  0% {
    transform: translateX(-500px);
    visibility: unset;
  }
  100% {
    cursor: pointer;
    opacity: 1;
    transform: translateX(0);
    visibility: unset;
    z-index: 1;
  }
`

export const Button = styled.button`
  background: none;
  color: ${colours.beige};
  cursor: pointer;
  font-family: ${fonts.primary};
  font-weight: 600;
  text-transform: uppercase;

  ${({ nav }) =>
    nav &&
    css`
      cursor: initial;
      left: 0;
      opacity: 0;
      padding-left: 4px;
      position: absolute;
      visibility: hidden;

      &::before {
        content: '';
        border-left: 3px solid ${colours.beige}};
        transition: border-color 1s ease-out;
      }
    `}

  /* "Add dictionary" button slide in effect */
  ${({ nav, deleteOrSave, isEditorOpen }) =>
    nav &&
    !deleteOrSave &&
    !isEditorOpen &&
    css`
      animation: ${slideIn} 1s forwards;
    `}

  /* "Save" and "Delete" buttons slide in effect */
  ${({ nav, deleteOrSave, isEditorOpen }) =>
    nav &&
    deleteOrSave &&
    isEditorOpen &&
    css`
      animation: ${slideIn} 1s forwards;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${colours.beigeDisabled};
      pointer-events: none;

      &::before {
        border-color: ${colours.beigeDisabled};
        transition: none;
      }
    `}

  &:hover {
    ${({ nav, disabled }) =>
      nav &&
      !disabled &&
      css`
        &::before {
          animation: ${addBorderColour} 1s forwards;
        }
      `}
  }
`
