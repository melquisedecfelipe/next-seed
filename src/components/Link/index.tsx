import React from 'react'
import NextLink from 'next/link'

import { ContainerLink } from './styles'

interface LinkProps {
  as?: string
  href: string
  isInternal?: boolean
  isSimple?: boolean
}

const Link: React.FC<LinkProps> = ({
  as,
  href,
  isInternal = true,
  isSimple = false,
  children
}) => (
  <ContainerLink isSimple={isSimple}>
    {isInternal ? (
      <NextLink as={as} href={href}>
        {children}
      </NextLink>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )}
  </ContainerLink>
)

export default Link
