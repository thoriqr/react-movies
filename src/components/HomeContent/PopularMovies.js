import React from 'react'
import { useMovieContext } from '../../context'
import ModalMovie from '../ModalMovie';

const PopularMovies = ({ movie, }) => {
  const { handleSelectMovie, showModalMovie, setShowModalMovie } = useMovieContext()

  const getTitle = (title) => {
    if (title.length >= 22) {
      return title.substring(0, 22) + "...";
    } else {
      return title;
    }
  };

  const Title = ({ title }) => {
    return <div className="font-semibold">{getTitle(title)}</div>;
  };

  return (
    <>
      <div
      onClick={() => { setShowModalMovie(true); handleSelectMovie(movie) }}
      className='flex-none cursor-pointer'>
        <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
        <div className='text-center py-1 text-xs xl:text-base lg:text-base '>
          <Title title={movie.title} />
          <div className='font-semibold'>{movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}</div>
        </div>
      </div>   
      {showModalMovie && (
        <ModalMovie/>
      )}
    </>

  )
}

export default PopularMovies