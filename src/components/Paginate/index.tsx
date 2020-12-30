import React from 'react'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { ContainerPaginate, Page } from './styles'

interface PaginateProps {
  currentPage: number
  nextPage: () => void
  pages: number[]
  previousPage: () => void
  setPage: (page: number) => void
}

const Paginate: React.FC<PaginateProps> = ({
  currentPage,
  nextPage,
  pages,
  previousPage,
  setPage
}) => {
  return (
    <ContainerPaginate>
      <ul>
        <Page isDisable={pages[0] === currentPage}>
          <button onClick={() => previousPage()}>
            <FiChevronLeft />
          </button>
        </Page>
        {pages.map(page => (
          <Page key={page} isActive={page === currentPage}>
            <button onClick={() => setPage(page)}>
              <p>{page}</p>
            </button>
          </Page>
        ))}
        <Page isDisable={pages[pages.length - 1] === currentPage}>
          <button onClick={() => nextPage()}>
            <FiChevronRight />
          </button>
        </Page>
      </ul>
    </ContainerPaginate>
  )
}

export default Paginate
