import React, { useCallback, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'

import { useRouter } from 'next/router'

import { FilmDetail, ImageFilm, VideoFilm } from '@/styles/pages/Film'

import { getFilmsPaginate, getFilm, getFilmTrailer } from '../../services/api'

import Template from '../../components/Template'

import Link from '../../components/Link'
import SEO from '../../components/SEO'

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

interface FilmProps {
  film: Film
}

export default function Film({ film }: FilmProps) {
  const router = useRouter()

  const [youtube, setYoutube] = useState('')

  useEffect(() => {
    getFilmTrailer({ filmId: film.id }).then(response => {
      if (response.length) {
        setYoutube(`https://www.youtube.com/embed/${response[0].key}`)
      }
    })
  }, [film])

  const timerConvert = useCallback((timer: number) => {
    const hours = Math.floor(timer / 60)
    const minutes = timer % 60
    return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}`
  }, [])

  if (!film?.id) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Template loading={router.isFallback}>
      <SEO
        title={film.title}
        description={film.overview}
        image={`${process.env.FILM_POSTER}/${film.backdrop_path}`}
      />

      <FilmDetail>
        <Link href="/" isInternal isSimple>
          Voltar
        </Link>

        <section>
          <small>
            Publicado em: {new Date(film.release_date).toLocaleDateString()}
            {film.runtime > 0 && ` | Tempo: ${timerConvert(film.runtime)}`}
          </small>
        </section>

        <hr />

        <ImageFilm image={`${process.env.FILM_POSTER}/${film.backdrop_path}`}>
          <h1>{film.title}</h1>
        </ImageFilm>

        {film.tagline && <h3>{film.tagline}</h3>}

        <p>{film.overview}</p>

        {youtube !== '' && (
          <VideoFilm>
            <iframe
              title={film.title}
              src={youtube}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoFilm>
        )}
      </FilmDetail>
    </Template>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { films } = await getFilmsPaginate({ currentPage: 1 })

  const paths = films.map((film: Film) => ({
    params: { slug: film.id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<FilmProps> = async context => {
  const { slug } = context.params

  const response = await getFilm({ filmId: slug })

  return {
    props: { ...response },
    revalidate: 60
  }
}
