import styled from 'styled-components/macro'

export const Overlay = styled.div`
  background: white;
  height: 100%;
  position: absolute;
  right: 0;
  transition: all 0.5s;
  top: 0;
  transform: translateX(${({ isEditorOpen }) => (isEditorOpen ? '0' : '100%')});
  width: calc(
    100% - 380px - 7px - 7px
  ); /* full width - sidebar - left gutter - inner gutter*/
`
