import React from 'react'

import { ContainerTemplate } from './styles'

import Loading from '../Loading'

interface TemplateProps {
  image?: string
  loading?: boolean
  title?: string
}

const Template: React.FC<TemplateProps> = ({ loading, children }) => {
  return (
    <ContainerTemplate>
      <Loading loading={loading} />

      <main>{children}</main>
    </ContainerTemplate>
  )
}

export default Template
