import styled, { keyframes, css } from 'styled-components'

const startAnimation = keyframes`
  0% {
    width: 40px;
  }

  100% {
    width: 90%;
  }
`

const endAnimation = keyframes`
  99% {
    width: 100%;
  }

  100% {
    width: 0;
  }
`

interface ContainerProps {
  isLoading: boolean
}

export const ContainerLoading = styled.div<ContainerProps>(
  ({ theme: { colors }, isLoading }) => css`
    width: 100%;
    height: 4px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

    &:before {
      content: '';
      background: ${colors.wheel.greenSecondary};
      display: block;
      height: 100%;
      animation: ${isLoading
          ? css`
              ${startAnimation} 300s
            `
          : css`
              ${endAnimation} 1.4s
            `}
        ease forwards;
    }
  `
)
