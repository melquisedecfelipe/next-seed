import React from 'react'

import { ContainerFilmCard } from './styles'

import Link from '../Link'

interface Film {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
}

interface FilmProps {
  film: Film
}

const FilmCard: React.FC<FilmProps> = ({ film }) => {
  return (
    <ContainerFilmCard image={`${process.env.FILM_POSTER}/${film.poster_path}`}>
      <section>
        <p>{film.title}</p>
      </section>

      <div>
        <small>
          Publicado em: {new Date(film.release_date).toLocaleDateString()}
        </small>

        <h3 title={film.title}>{film.title}</h3>
        <p title={film.overview}>{film.overview}</p>

        <Link as={`/film/${film.id.toString()}`} href="/film/[slug]" isSimple>
          Ver filme
        </Link>
      </div>
    </ContainerFilmCard>
  )
}

export default FilmCard
