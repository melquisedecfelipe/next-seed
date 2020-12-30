import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useFilm } from '@/hooks/film'

import { FilmsContainer } from '@/styles/pages/Films'

import FilmCard from '@/components/FilmCard'
import Paginate from '@/components/Paginate'
import Template from '@/components/Template'
import SEO from '@/components/SEO'

interface Film {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
}

export default function Films() {
  const { films, loading, pages: apiTotalPage, getFilms } = useFilm()

  const [page, setPage] = useState(1)

  const [pages, setPages] = useState([])

  const totalPage = useMemo(() => apiTotalPage, [apiTotalPage])
  const buttons = useMemo(() => 5, [])

  useEffect(() => {
    const localStoragePage = parseInt(
      localStorage.getItem('@Refactor:lastPage')
    )

    if (localStoragePage) {
      setPage(localStoragePage)
    }
  }, [])

  useEffect(() => {
    let maximumLeft = page - Math.floor(buttons / 2)
    let minimumRight = page + Math.floor(buttons / 2)

    if (maximumLeft < 1) {
      maximumLeft = 1
      minimumRight = 5
    }

    if (minimumRight > totalPage) {
      maximumLeft = totalPage - (buttons - 1)
      minimumRight = totalPage

      if (maximumLeft < 1) maximumLeft = 1
    }

    const totalPages = []

    for (let page = maximumLeft; page <= minimumRight; page++) {
      totalPages.push(page)
    }

    setPages(totalPages)
  }, [page, totalPage])

  useEffect(() => {
    getFilms(page)

    window.scrollTo(0, 0)
  }, [page])

  const goToPage = useCallback((page: number) => {
    localStorage.setItem('@Refactor:lastPage', page.toString())

    setPage(page)
  }, [])

  const nextPage = useCallback(() => {
    const enable = page < totalPage - 1

    if (enable) goToPage(page + 1)
  }, [page, totalPage])

  const previousPage = useCallback(() => {
    const enable = page >= 1

    if (enable) goToPage(page - 1)
  }, [page, totalPage])

  return (
    <Template loading={loading}>
      <SEO title="Filmes" />

      <FilmsContainer>
        <div>
          <h2>Filmes</h2>
          <p>Fique por dentro dos últimos filmes.</p>
        </div>

        <section>
          {loading ? (
            <h3>Carregando...</h3>
          ) : (
            films.map((film: Film) => <FilmCard key={film.id} film={film} />)
          )}
        </section>

        {!!pages.length && (
          <Paginate
            currentPage={page}
            nextPage={nextPage}
            pages={pages}
            previousPage={previousPage}
            setPage={goToPage}
          />
        )}
      </FilmsContainer>
    </Template>
  )
}
