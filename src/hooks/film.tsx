import React, { createContext, useCallback, useContext, useState } from 'react'
import { getFilmsPaginate, getFilm } from '../services/api'

interface Film {
  id: number
  title: string
  tagline: string
  overview: string
  runtime: number
  release_date: string
  poster_path: string
  backdrop_path: string
  homepage: string
}

interface FilmContextData {
  error: string
  film: Film
  films: Film[]
  loading: boolean
  pages: number
  getFilmDetail(filmId: number): Promise<void>
  getFilms(currentPage: number): Promise<void>
}

const FilmContext = createContext<FilmContextData>({} as FilmContextData)

const FilmProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({
    error: '',
    film: {} as Film,
    films: [] as Film[],
    loading: false,
    pages: 0
  })

  const getFilmDetail = useCallback(async (filmId: number) => {
    const response = await getFilm({ filmId })

    setData({ ...data, ...response })
  }, [])

  const getFilms = useCallback(async (currentPage?: number) => {
    const response = await getFilmsPaginate({ currentPage })

    setData({ ...data, ...response })
  }, [])

  return (
    <FilmContext.Provider
      value={{
        error: data.error,
        film: data.film,
        films: data.films,
        loading: data.loading,
        pages: data.pages,
        getFilmDetail,
        getFilms
      }}
    >
      {children}
    </FilmContext.Provider>
  )
}

function useFilm(): FilmContextData {
  const context = useContext(FilmContext)

  if (!context) {
    throw new Error('useFilm must be used within an FilmProvider')
  }

  return context
}

export { FilmProvider, useFilm }
