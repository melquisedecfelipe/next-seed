import styled, { css } from 'styled-components'

interface FilmDetailProps {
  image?: string
}

export const FilmDetail = styled.article<FilmDetailProps>(
  ({ theme: { colors, media, size } }) => css`
    padding: ${size(5)} ${size(2)};

    ${media.tablet(css`
      padding: ${size(10)} ${size(5)};
    `)}

    ${media.desktop(css`
      max-width: 950px;
      width: 100%;
      margin: 0 auto;
    `)}

    > hr {
      border: 1px solid ${colors.wheel.gray};
    }

    > section {
      display: flex;
      flex-direction: column;
      margin: ${size(2)} 0;

      > small {
        color: ${colors.primary};
        opacity: 0.75;
      }
    }

    > h3 {
      margin-top: ${size(4)};
    }

    > p {
      margin-top: ${size(2)};
    }
  `
)

export const ImageFilm = styled.div<FilmDetailProps>(
  ({ theme: { colors, size }, image }) => css`
    display: flex;
    align-items: flex-end;
    margin: ${size(2)} 0;
    padding: ${size(2)};
    height: 500px;
    width: 100%;
    background: linear-gradient(-30deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
      url(${image});
    background-size: cover;
    background-position: center;

    > h1 {
      color: ${colors.secondary};
    }
  `
)

export const VideoFilm = styled.div(
  ({ theme: { size } }) => css`
    margin: ${size(2)} 0;
    position: relative;
    padding-bottom: calc(var(--aspect-ratio, 0.5625) * 100%);
    height: 0;

    > iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `
)
