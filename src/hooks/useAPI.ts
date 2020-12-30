import { useReducer, useEffect } from 'react'

interface Film {
  id: number
  title: string
  tiny_overview: string
  overview: string
  runtime: string
  release_date: string
  poster_path: string
  backdrop_path: string
  youtube: string
  enable: string
}

interface State {
  error: string
  film: Film
  films: [Film]
  loading: boolean
  pages: number
}

interface Params {
  currentPage?: number
  filmId?: number
}

const actions = {
  FETCH: (state: State) => ({
    ...state,
    loading: true
  }),
  SUCCESS: (state: State, { response }) => {
    return {
      ...state,
      error: null,
      loading: false,
      ...response
    }
  },
  ERROR: (state: State, { error }) => ({
    ...state,
    loading: false,
    error
  })
}

const reducer = (state: State, { type, ...params }) => {
  const handler = actions[type]
  return handler ? handler(state, params) : state
}

const useAPI = (service: any, params?: Params) => {
  const [{ films, film, error, loading, pages }, dispatch] = useReducer(
    reducer,
    {
      error: null,
      film: {},
      films: [],
      loading: false,
      pages: 0
    }
  )

  const fetchMore = async (fetchMoreParams?: Params) => {
    dispatch({ type: 'FETCH' })
    try {
      const response = await service(fetchMoreParams || params)

      dispatch({ type: 'SUCCESS', response })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.message })
    }
  }

  useEffect(() => {
    fetchMore()
  }, [])

  return [{ error, film, films, loading, pages }, { fetchMore }]
}

export default useAPI
