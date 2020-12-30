import React from 'react'

import { FilmProvider } from './film'

const AppProvider: React.FC = ({ children }) => (
  <FilmProvider>{children}</FilmProvider>
)

export default AppProvider
