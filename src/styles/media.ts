import { css, FlattenSimpleInterpolation } from 'styled-components'

const createMedia = (
  styles: FlattenSimpleInterpolation,
  min: number,
  max?: number
) => css`
  @media screen and (min-width: ${min}px) {
    ${max ? css`and (max-width: ${max}px)` : ''} {
      ${css`
        ${styles}
      `}
    }
  }
`

interface Media {
  mobile: (styles: FlattenSimpleInterpolation) => FlattenSimpleInterpolation
  tablet: (styles: FlattenSimpleInterpolation) => FlattenSimpleInterpolation
  desktop: (styles: FlattenSimpleInterpolation) => FlattenSimpleInterpolation
  onlyMobile: (styles: FlattenSimpleInterpolation) => FlattenSimpleInterpolation
}

const media = {} as Media

media.mobile = styles => createMedia(styles, 320)

media.tablet = styles => createMedia(styles, 768)

media.desktop = styles => createMedia(styles, 1024)

media.onlyMobile = styles => createMedia(styles, 320, 768)

export default media
