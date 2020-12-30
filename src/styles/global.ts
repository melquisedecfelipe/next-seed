import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle(
  ({ theme: { colors, media, size } }) => css`
    * {
      margin: 0;
      box-sizing: border-box;
      color: ${colors.primary};
      font-family: 'Poppins', sans-serif;
      scroll-behavior: smooth;
    }

    h1 {
      font-size: ${size(5)};
    }

    h2 {
      font-size: ${size(3)};
    }

    h3 {
      font-size: ${size(2.5)};
    }

    h4 {
      font-size: ${size(2)};
    }

    p {
      font-size: ${size(2)};
    }

    small {
      font-size: ${size(1.5)};
    }

    ${media.tablet(css`
      h1 {
        font-size: ${size(7)};
      }

      h2 {
        font-size: ${size(5)};
      }

      h3 {
        font-size: ${size(3)};
      }
    `)};

    a,
    button {
      cursor: pointer;
    }
  `
)

export default GlobalStyles
