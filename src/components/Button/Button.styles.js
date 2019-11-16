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
      padding-left: 4px;

      &::before {
        content: '';
        border-left: 3px solid ${colours.beige}};
        transition: all 1s ease-out;
      }
    `}

  &:hover {
    ${({ nav }) =>
      nav &&
      css`
        &::before {
          animation: ${addBorderColour} 1s forwards;
        }
      `}
  }
`
