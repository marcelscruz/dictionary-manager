import styled from 'styled-components/macro'

export const LeftPanel = styled.aside`
  background: ${({ theme }) => theme.colours.orange};
  height: 100%;
  margin-right: 7px;
  padding: 60px 30px;
  width: 380px;
`

export const RightPanel = styled.main`
  background: ${({ theme }) => theme.colours.purple};
  display: flex;
  flex-grow: 1;
  height: 100%;
`
