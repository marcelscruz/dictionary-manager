import styled, { css, keyframes } from 'styled-components/macro'
import { colours, fonts } from 'utils/theme'

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
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Button = styled.button`
  background: none;
  border: none;
  color: ${colours.beige};
  cursor: pointer;
  font-family: ${fonts.primary};
  font-weight: 600;
  outline: none;
  text-transform: uppercase;

  ${({ nav }) =>
    nav &&
    css`
      left: 0;
      opacity: 0;
      padding-left: 4px;
      position: absolute;

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
      cursor: initial;
      opacity: 0.3;

      &::before {
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
