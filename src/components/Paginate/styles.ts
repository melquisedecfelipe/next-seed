import styled, { css } from 'styled-components'

interface PageProps {
  isActive?: boolean
  isDisable?: boolean
}

export const ContainerPaginate = styled.div(
  ({ theme: { colors, size } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${size(3)};

    > select {
      margin: 0 ${size(0.5)};
      border: 0;
      background: none;
      border: 1px solid ${colors.primary};
      width: 40px;
      height: 30px;
      color: ${colors.primary};
      font-size: ${size(2)};
    }

    > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      padding-left: 0;
    }
  `
)

export const Page = styled.li<PageProps>(
  ({ theme: { colors, size }, isActive, isDisable }) => css`
    > button {
      margin: 0 ${size(0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: none;
      border: 1px solid ${colors.primary};
      width: 30px;
      height: 30px;
      transition: all 0.25s;

      &:hover {
        opacity: 0.5;
      }

      > p {
        font-size: ${size(2)};
        color: ${colors.primary};
      }

      > svg {
        font-size: ${size(2)};
        stroke: ${colors.primary};
      }

      ${isActive &&
      css`
        background: ${colors.primary};

        > p {
          color: ${colors.secondary};
          font-weight: 700;
        }
      `}

      ${isDisable &&
      css`
        opacity: 0.5;
        cursor: no-drop;
      `}
    }
  `
)
