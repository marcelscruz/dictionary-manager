import styled, { css, keyframes } from 'styled-components/macro'
import colours from 'utils/colours'

const borderColourIn = keyframes`
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
  color: ${({ theme }) => theme.colours.beige};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  outline: none;
  text-transform: uppercase;

  ${({ nav, theme }) =>
    nav &&
    css`
      padding-left: 4px;

      &::before {
        content: '';
        border-left: 3px solid ${theme.colours.beige}};
        transition: all 1s ease-out;
      }
    `}

  &:hover {
    ${({ nav }) =>
      nav &&
      css`
        &::before {
          animation: ${borderColourIn} 1s forwards;
        }
      `}
  }
`
