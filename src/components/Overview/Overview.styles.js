import styled from 'styled-components/macro'
import Masonry from 'react-masonry-css'

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
  background: ${({ theme }) => theme.colours.beige};
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
  color: ${({ theme }) => theme.colours.orange};
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: 0 0 10px;
`

export const PublishedDate = styled.h3`
  color: ${({ theme }) => theme.colours.black};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 12px;
  margin: 0 0 20px;
  opacity: 0.3;
`

export const DictionaryContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colours.lightGrey};
  display: flex;
  padding: 5px 10px;

  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.colours.lightGrey};
  }

  span {
    color: ${({ theme }) => theme.colours.black};
    font-family: ${({ theme }) => theme.fonts.secondary};
    letter-spacing: 0.6px;
  }
`

export const Value = styled.span`
  width: 46%;
`

export const Arrow = styled.span`
  margin: 0 5px;
  text-align: center;
  width: 8%;
`
