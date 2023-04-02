import React, { useEffect, useState } from 'react'
import { useMovieContext } from '../../context'

import ModalMovie from '../ModalMovie'
import MoviePlaceHolder from '../../img/img-placeholder.png'

const MoviesList = ({ movie }) => {
  const { handleSelectMovie, selectMovie, showModalMovie, setShowModalMovie, movieGenres } = useMovieContext()

  const [overviewLength, setOverviewLength] = useState(150)

  useEffect(() => {
    if (showModalMovie) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 322) {
        setOverviewLength(50);
      } else if (screenWidth <= 768) {
        setOverviewLength(80)
      } else if (screenWidth <= 893) {
        setOverviewLength(100);
      } else {
        setOverviewLength(150);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showModalMovie]);

  const getOverview = () => {
    if (selectMovie.overview.length >= overviewLength) {
      return selectMovie.overview.substring(0, overviewLength) + '...';
    } else {
      return selectMovie.overview;
    }
  };

  // potong judul movie jika lebih 22 karakter
  const getTitle = () => {
    if (movie.title.length >= 22) {
      return movie.title.substring(0, 22) + "..."
    } else {
      return movie.title
    }
  }

  const getGenres = () => {
    let movieGenresHover = []
    movieGenres.forEach((movieGenre) => {
      if (movie.genre_ids.includes(movieGenre.id)) {
        movieGenresHover.push(movieGenre.name)
      }
    })

    return (
      <div className='flex gap-1'>
        {movieGenresHover.slice(0, 2).map((movieGenreHover, index) => {
          const isLastGenre = index === movieGenresHover.slice(0, 2).length - 1
          const comma = isLastGenre ? '' : ','
          return <p key={movieGenreHover.toString()} className=''>{movieGenreHover}{comma}</p>
        })}
      </div>
    )
  }

  return (
    <>
      <div onClick={() => { setShowModalMovie(true); handleSelectMovie(movie) }} className='card-container' >
        <div className='img-holder'>
          <div className='img-overlay'></div>
          <img
            alt={movie.title}
            key={movie.id}
            style={{ borderRadius: '6px' }}
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            onError={(e) => { e.target.src = MoviePlaceHolder }}>
          </img>
          <div className='genre-overview'>
            <div className='text-center'>{getOverview()}</div>
            <div className='flex justify-center pt-4'>
              <div className=''>{getGenres()}</div>
            </div>
          </div>
        </div>
        <div className='text-center py-1 text-xs xl:text-base lg:text-base border-b border-white'>
          <div className='font-semibold'>{getTitle()}</div>
          <div className='font-semibold'>{movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}</div>
        </div>
      </div>
      {showModalMovie && (
        <ModalMovie />
      )}
    </>
  )
}

export default MoviesList