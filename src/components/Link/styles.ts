import styled, { css } from 'styled-components'

interface ContainerLinkProps {
  isSimple: boolean
}

export const ContainerLink = styled.span<ContainerLinkProps>(
  ({ theme: { colors, size }, isSimple }) => css`
    ${isSimple
      ? css`
          > a {
            font-weight: 700;
            font-size: ${size(1.5)};
            text-transform: uppercase;
            letter-spacing: 2.5px;
            transition: all 0.25s;
            margin-top: ${size(1.5)};

            &:hover {
              opacity: 0.5;
            }
          }
        `
      : css`
          > a {
            border: 0;
            min-height: 50px;
            padding: 0 ${size(3)};
            font-size: ${size(1.5)};
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            transition: all 0.25s;
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: ${colors.primary};
            color: ${colors.secondary};

            &:hover {
              opacity: 0.5;
            }
          }
        `}
  `
)
