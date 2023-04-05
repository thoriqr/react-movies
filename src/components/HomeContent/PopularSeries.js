import React, { useEffect } from 'react'
import { useMovieContext } from '../../context'
import ModalSerie from '../ModalSerie';

const PopularSeries = ({ serie }) => {
  const { handleSelectSerie, showModalSerie, setShowModalSerie } = useMovieContext()

  useEffect(() => {
    if (showModalSerie) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModalSerie])

  const getTitle = (name) => {
    if (name.length >= 22) {
      return name.substring(0, 22) + "...";
    } else {
      return name;
    }
  };

  const Title = ({ name }) => {
    return <div className="font-semibold">{getTitle(name)}</div>;
  };

  return (
    <>
      <div onClick={() => { setShowModalSerie(true); handleSelectSerie(serie) }}
        className='flex-none cursor-pointer'>
        <img src={`https://image.tmdb.org/t/p/w185${serie.poster_path}`} alt={serie.name} />
        <div className='text-center py-1 text-xs xl:text-base lg:text-base '>
          <Title name={serie.name} />
          <div className='font-semibold'>{serie.first_air_date ? `(${serie.first_air_date.slice(0, 4)})` : ""}</div>
        </div>
      </div>
      {showModalSerie && (
        <ModalSerie />
      )}
    </>
  )
}

export default PopularSeries