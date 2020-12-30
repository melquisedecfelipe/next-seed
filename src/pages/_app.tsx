import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import AppProvider from '@/hooks/index'

import GlobalStyle from '@/styles/global'
import theme from '@/styles'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AppProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </AppProvider>
)

export default MyApp
