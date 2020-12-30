import React from 'react'

import { NotFoundContainer } from '@/styles/pages/NotFound'

import Template from '@/components/Template'
import SEO from '@/components/SEO'

export default function NotFound() {
  return (
    <Template>
      <SEO title="404" />

      <NotFoundContainer>
        <div>
          <h2>404</h2>
          <p>Você está perdido?</p>
        </div>
      </NotFoundContainer>
    </Template>
  )
}
