import React, { useCallback, useEffect, useMemo, useState } from 'react'

import useAPI from '@/hooks/useAPI'

import { getFilmsPaginate } from '@/services/api'

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
  const [
    { films, lastPage, loading, pages: apiTotalPage },
    { fetchMore, setLastPage }
  ] = useAPI(getFilmsPaginate)

  const [pages, setPages] = useState([])

  const page = useMemo(() => lastPage, [lastPage])
  const totalPage = useMemo(() => apiTotalPage, [apiTotalPage])
  const buttons = useMemo(() => 5, [])

  useEffect(() => {
    const lastPageStorage = parseInt(localStorage.getItem('@Refactor:lastPage'))

    if (lastPageStorage) setLastPage(lastPageStorage)
  }, [])

  useEffect(() => {
    fetchMore({ currentPage: page })

    window.scrollTo(0, 0)
  }, [page])

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

  const nextPage = useCallback(() => {
    const enable = page < totalPage - 1

    if (enable) setLastPage(page + 1)
  }, [page, totalPage])

  const previousPage = useCallback(() => {
    const enable = page >= 1

    if (enable) setLastPage(page - 1)
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
            films.map((film: Film) => <FilmCard key={films.id} film={film} />)
          )}
        </section>

        {pages.length > 1 && (
          <Paginate
            currentPage={page}
            nextPage={nextPage}
            pages={pages}
            previousPage={previousPage}
            setPage={setLastPage}
          />
        )}
      </FilmsContainer>
    </Template>
  )
}
