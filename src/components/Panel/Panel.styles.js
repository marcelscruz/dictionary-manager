import styled from 'styled-components/macro'
import { colours } from 'utils/theme'

export const LeftPanel = styled.aside`
  background: ${colours.orange};
  height: 100%;
  margin-right: 7px;
  padding: 60px 30px;
  width: 380px;
`

export const RightPanel = styled.main`
  background: ${colours.purple};
  display: flex;
  flex-grow: 1;
  height: 100%;
`
