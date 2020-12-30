import { useCallback, useEffect, useReducer } from 'react'

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

interface State {
  error: string
  film: Film
  films: [Film]
  lastPage: string
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
  }),
  SET_LAST_PAGE: (state: State, { page }) => ({
    ...state,
    lastPage: page
  })
}

const reducer = (state: State, { type, ...params }) => {
  const handler = actions[type]
  return handler ? handler(state, params) : state
}

const useAPI = (service: any, params?: Params) => {
  const data = {
    error: null,
    film: {},
    films: [],
    lastPage: 1,
    loading: false,
    pages: 0
  }

  const [state, dispatch] = useReducer(reducer, data)

  const fetchMore = useCallback(async (fetchMoreParams?: Params) => {
    dispatch({ type: 'FETCH' })
    try {
      const response = await service(fetchMoreParams || params)

      dispatch({ type: 'SUCCESS', response })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.message })
    }
  }, [])

  const setLastPage = useCallback(async (page: number) => {
    localStorage.setItem('@Refactor:lastPage', page.toString())

    dispatch({ type: 'SET_LAST_PAGE', page })
  }, [])

  useEffect(() => {
    fetchMore()
  }, [])

  return [state, { fetchMore, setLastPage }]
}

export default useAPI
