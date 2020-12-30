import axios from 'axios'

axios.defaults.baseURL = process.env.FILM_URL

const getFilmsPaginate = async ({ currentPage }) => {
  const queryString = `api_key=${process.env.FILM_KEY}&language=pt-BR`

  const { data } = await axios.get(
    `discover/movie?${queryString}&page=${currentPage}`
  )

  return { films: data.results, pages: data.total_pages }
}

const getFilm = async ({ filmId }) => {
  const queryString = `api_key=${process.env.FILM_KEY}&language=pt-BR`

  const { data } = await axios.get(`movie/${filmId}?${queryString}`)

  return { film: data }
}

const getFilmTrailer = async ({ filmId }) => {
  const queryString = `api_key=${process.env.FILM_KEY}&language=pt-BR`

  const { data } = await axios.get(`movie/${filmId}/videos?${queryString}`)

  return data.results
}

export { getFilmsPaginate, getFilm, getFilmTrailer }
