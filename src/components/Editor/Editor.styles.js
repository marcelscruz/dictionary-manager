import styled from 'styled-components/macro'
import { colours, spacing } from 'utils/theme'

export const Overlay = styled.div`
  background: white;
  border-bottom: ${spacing.gutter} solid ${colours.purple};
  border-right: ${spacing.gutter} solid ${colours.purple};
  height: 100%;
  position: absolute;
  right: 0;
  transition: all 0.5s;
  top: 0;
  transform: translateX(${({ isEditorOpen }) => (isEditorOpen ? '0' : '100%')});
  width: calc(
    100% - 380px - ${spacing.gutter}
  ); /* full width - sidebar - left gutter */
`
