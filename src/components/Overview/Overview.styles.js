import styled from 'styled-components/macro'
import Masonry from 'react-masonry-css'

export const Grid = styled(Masonry).attrs(({ breakpointCols }) => ({
  breakpointCols,
}))`
  display: flex;
  padding: 0 10px;
  overflow: auto;
  width: 100%;

  > * {
    margin: 0 10px;
  }
`

export const Card = styled.article`
  background: ${({ theme }) => theme.colours.beige};
  border: 1px solid white;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 20px;
  position: relative;
  top: 60px;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.02);
  }
`

export const DictionaryTitle = styled.h2`
  color: ${({ theme }) => theme.colours.orange};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-top: 0;
`

export const DictionaryContainer = styled.div``
