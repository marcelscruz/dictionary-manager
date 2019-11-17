import styled, { css } from 'styled-components/macro'
import { colours, fonts, spacing } from 'utils/theme'

export const Container = styled.div`
  background: ${colours.beige};
  border-bottom: ${spacing.gutter} solid ${colours.purple};
  border-right: ${spacing.gutter} solid ${colours.purple};
  height: 100%;
  overflow: auto;
  padding: calc(60px + ${spacing.gutter}) 10% 60px;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.5s;
  transform: translateX(${({ isEditorOpen }) => (isEditorOpen ? '0' : '100%')});
  width: calc(
    100% - 380px - ${spacing.gutter}
  ); /* full width - sidebar - left gutter */
`

export const Title = styled.h2`
  color: ${colours.purple};
  font-family: ${fonts.primary};
  letter-spacing: 0.6px;
  margin: 0;
  text-transform: uppercase;
`

export const Form = styled.form`
  color: ${colours.black};
  font-family: ${fonts.secondary};
  position: relative;
  margin-top: 80px;
`

export const TitleInputContainer = styled.div`
  position: relative;
`

export const TitleInput = styled.input`
  background: ${colours.beige};
  border-bottom: 2px solid ${colours.lightGrey};
  letter-spacing: 0.6px;
  width: 300px;
`

export const Label = styled.label`
  display: block;
  font-family: ${fonts.primary};
  font-size: 16px;
  font-weight: 600;
  opacity: 0.5;

  ${({ hidden }) =>
    hidden &&
    css`
      visibility: hidden;
    `}

  ${({ titleInput }) =>
    titleInput &&
    css`
      bottom: 2px;
      letter-spacing: 0.3px;
      position: absolute;
      text-transform: uppercase;
      transition: all 0.5s;

      ${({ shouldMoveTitleLabelUp }) =>
        shouldMoveTitleLabelUp &&
        `
          font-size: 12px;
          letter-spacing: unset;
          transform: translateY(-25px);
      `}
    `}
`

export const RowsHeading = styled.span`
  display: inline-block;
  font-family: ${fonts.primary};
  font-size: 12px;
  font-weight: 600;
  margin: 30px 0 2px;
  opacity: 0.5;
  text-transform: uppercase;
`

export const Row = styled.div`
  align-items: center;
  border-top: 1px solid ${colours.lightGrey};
  display: flex;
  padding: 5px 10px;
  position: relative;
  width: 600px;

  border-bottom: 1px solid ${colours.lightGrey};
  &:last-of-type {
  }

  span {
    color: ${colours.black};
    font-family: ${fonts.secondary};
    letter-spacing: 0.6px;
  }
`

export const ValueInput = styled.input`
  background: ${colours.beige};
  letter-spacing: 0.6px;
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

export const DeleteRowButton = styled.div`
  align-items: center;
  background: ${colours.red};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 17px;
  left: -30px;
  position: absolute;
  width: 17px;
`

export const ErrorsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  /* height: 17px; */
  right: -120px;
  position: absolute;
  width: 100px;
`

export const ErrorIcon = styled.div`
  margin-right: 10px;
`

export const CloseButton = styled.div`
  align-items: center;
  background: ${colours.purple};
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  right: -${spacing.gutter};
  top: 0;
  width: 50px;
`

export const X = styled.span`
  color: ${colours.beige} !important;
  font-size: ${({ fontSize }) => fontSize + 'px'};
`

export const AddRowButton = styled.div`
  align-items: center;
  background: ${colours.green};
  border-radius: 50%;
  color: ${colours.beige};
  cursor: pointer;
  display: flex;
  font-size: 15px;
  height: 17px;
  justify-content: center;
  left: -30px;
  margin-top: 10px;
  position: absolute;
  width: 17px;
`
