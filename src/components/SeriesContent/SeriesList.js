import React, { useEffect, useState } from 'react'
import MoviePlaceHolder from '../../img/img-placeholder.png'
import { useMovieContext } from '../../context';
import ModalSerie from '../ModalSerie';

const SeriesContent = ({ serie }) => {

  const { handleSelectSerie, showModalSerie, setShowModalSerie, selectSerie, serieGenres } = useMovieContext()

  const [overviewLength, setOverviewLength] = useState(150)

  useEffect(() => {
    if (showModalSerie) {
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
  }, [showModalSerie]);

  const getOverview = () => {
    if (selectSerie.overview.length >= overviewLength) {
      return selectSerie.overview.substring(0, overviewLength) + '...';
    } else {
      return selectSerie.overview;
    }
  };

  // potong judul movie jika lebih 22 karakter
  const getTitle = () => {
    if (serie.name.length >= 22) {
      return serie.name.substring(0, 22) + "..."
    } else {
      return serie.name
    }
  }

  const getGenres = () => {
    let serieGenresHover = []
    serieGenres.forEach((serieGenre) => {
      if (serie.genre_ids.includes(serieGenre.id)) {
        serieGenresHover.push(serieGenre.name)
      }
    })

    return (
      <div className='flex gap-1'>
        {serieGenresHover.slice(0, 2).map((serieGenreHover, index) => {
          const isLastGenre = index === serieGenreHover.slice(0, 2).length - 1
          const comma = isLastGenre ? '' : ','
          return <p key={serieGenreHover.toString()} className='semibold'>{serieGenreHover}{comma}</p>
        })}
      </div>
    )
  }

  return (
    <>
      <div onClick={() => { setShowModalSerie(true); handleSelectSerie(serie) }} className='card-container' >
        <div className='img-holder'>
          <div className='img-overlay'></div>
          <img
            alt={serie.name}
            key={serie.id}
            style={{ borderRadius: '6px' }}
            src={`https://image.tmdb.org/t/p/w342${serie.poster_path}`}
            onError={(e) => { e.target.src = MoviePlaceHolder }}>
          </img>
          <div className='genre-overview'>
            <div className='text-center'>{getOverview()}</div>
            <div className='flex justify-center pt-4'>
              <div className='text-sm'>{getGenres()}</div>
            </div>
          </div>
        </div>
        <div className='text-center py-1 text-xs xl:text-base lg:text-base border-b border-white'>
          <div className='font-semibold'>{getTitle()}</div>
          <div className='font-semibold'>{serie.first_air_date ? `(${serie.first_air_date.slice(0, 4)})` : ""}</div>
        </div>
      </div>
      {showModalSerie && (
        <ModalSerie />
      )}
    </>
  )
}

export default SeriesContent