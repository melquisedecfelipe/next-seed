import styled, { css } from 'styled-components'

interface FilmCardProps {
  image: string
}

export const ContainerFilmCard = styled.div<FilmCardProps>(
  ({ theme: { colors, media, size }, image }) => css`
    padding: ${size(4)} 0;
    height: 100%;
    border-bottom: 1px solid ${colors.wheel.gray};
    display: flex;
    flex-direction: column;

    ${media.desktop(css`
      flex-direction: row;
    `)}

    > section {
      background: url(${image});
      background-size: cover;
      background-position: center;
      display: flex;
      width: 100%;
      height: calc(150px * 1.5);
      margin-bottom: ${size(3)};

      > p {
        display: none;
      }

      ${media.desktop(css`
        flex-direction: row;
        width: 100%;
        min-width: 150px;
        max-width: 150px;
        margin-bottom: 0;
        margin-right: ${size(3)};
      `)}
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      > small {
        color: ${colors.primary};
        opacity: 0.75;
      }

      > h3 {
        color: ${colors.primary};
        margin: ${size(1)} 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      > p {
        color: ${colors.primary};
        margin-bottom: ${size(1)};
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  `
)
