import React, { useEffect, useState } from 'react'
import { useMovieContext } from '../../context'

const TrendingSwipe = ({ trendingMovie,  }) => {
  const { handleSelectMovie,setShowModalMovie}= useMovieContext()

  const [overviewLength, setOverviewLength] = useState(150)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 322) {
        setOverviewLength(40);
      } else if (screenWidth <= 640) {
        setOverviewLength(70);
      } else {
        setOverviewLength(200);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getOverview = () => {
    if (trendingMovie.overview.length >= overviewLength) {
      return trendingMovie.overview.substring(0, overviewLength) + '...';
    } else {
      return trendingMovie.overview;
    }
  };

  return (
    <>
      <div className=' text-white '>
        <img
          alt={trendingMovie.title}
          src={`https://image.tmdb.org/t/p/original/${trendingMovie.backdrop_path}`}
        />
        <div className='absolute h-full bg-zinc-900 top-0 float-left w-[45%] xl:w-[30%] lg:w-[30%] md:w-[30%] sm:w-[30%]  opacity-50'>
        </div>
        <div className='absolute w-[35%] top-8 left-4 xl:w-[25%] lg:w-[25%] md:w-[25%] sm:w-[25%] xl:top-32 xl:left-8 lg:top-32 lg:left-8 md:top-24 md:left-8 sm:top-20 sm:left-4'>
          <div className='flex gap-1 text-xs xl:text-2xl lg:text-xl md:text-base sm:text-sm '>
            <div className='font-semibold'>{trendingMovie.title}</div>
            <div className=''>({trendingMovie.release_date.slice(0, 4)})</div>
          </div>
          <div className='text-xs xl:text-xl lg:text-lg md:text-sm sm:text-xs'>
            <div className='font-light pt-1'>{getOverview()}
              <button
                onClick={() => { setShowModalMovie(true); handleSelectMovie(trendingMovie) }}
                className='font-normal'>More</button></div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default TrendingSwipe