import styled from 'styled-components/macro'
import Masonry from 'react-masonry-css'
import { colours, fonts } from 'utils/theme'

export const Grid = styled(Masonry).attrs(({ breakpointCols }) => ({
  breakpointCols,
  columnClassName: '',
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
  background: ${colours.beige};
  border: 1px solid white;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 20px;
  position: relative;
  top: 60px;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.02);
  }
`

export const DictionaryTitle = styled.h2`
  color: ${colours.orange};
  font-family: ${fonts.primary};
  margin: 0 0 10px;
`

export const PublishedDate = styled.h3`
  color: ${colours.black};
  font-family: ${fonts.secondary};
  font-size: 12px;
  margin: 0 0 20px;
  opacity: 0.3;
`

export const Row = styled.div`
  border-top: 1px solid ${colours.lightGrey};
  display: flex;
  padding: 5px 10px;

  &:last-of-type {
    border-bottom: 1px solid ${colours.lightGrey};
  }

  span {
    color: ${colours.black};
    font-family: ${fonts.secondary};
    letter-spacing: 0.6px;
  }
`

export const Value = styled.span`
  width: 46%;
`

export const Arrow = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 5px;
  text-align: center;
  width: 8%;
`
