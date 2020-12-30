import styled, { css } from 'styled-components'

interface ContainerProps {
  isActive: boolean
  isDisable: boolean
  isOutline: boolean
}

export const ContainerButton = styled.button<ContainerProps>(
  ({ theme: { colors, size }, isActive, isDisable, isOutline }) => css`
    border: 0;
    min-height: 50px;
    padding: 0 ${size(3)};
    font-size: ${size(1.5)};
    font-weight: 700;
    text-transform: uppercase;
    transition: all 0.25s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
      background: transparent;
      margin-left: ${size(2)};
      transition: all 0.25s;
      font-size: ${size(2.5)};
    }

    ${isOutline
      ? css`
          border: 1px solid;
          border-color: ${colors.secondary};
          color: ${colors.secondary};

          > svg {
            fill: ${colors.secondary};
          }

          &:hover {
            background-color: ${colors.secondary};
            color: ${colors.primary};

            > svg {
              fill: ${colors.primary};
            }
          }
        `
      : css`
          ${isActive
            ? css`
                background-image: linear-gradient(
                  to bottom right,
                  ${colors.wheel.yellow},
                  ${colors.wheel.yellowSecondary}
                );
                color: ${colors.primary};
              `
            : css`
                background-color: ${colors.primary};
                color: ${colors.secondary};
              `}

          > svg {
            fill: ${colors.secondary};
          }

          &:hover {
            opacity: 0.5;

            > svg {
              opacity: 0.5;
            }
          }
        `}

    ${isDisable &&
    css`
      opacity: 0.5;
      cursor: no-drop;
    `}
  `
)
