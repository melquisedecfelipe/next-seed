import React from 'react'

import { ContainerLoading } from './styles'

interface LoadingProps {
  loading: boolean
}

const Loading: React.FC<LoadingProps> = ({ loading }) => (
  <ContainerLoading isLoading={loading} />
)

export default Loading
