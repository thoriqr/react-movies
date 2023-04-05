import React, { useEffect } from 'react'
import { useMovieContext } from '../context'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import TrendingSwipe from '../components/HomeContent/TrendingSwipe'
import PopularMovies from '../components/HomeContent/PopularMovies'
import PopularSeries from '../components/HomeContent/PopularSeries'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { fetchMovies, fetchSeries, fetchTrendingMovies, trendingMovies, movies, series, } = useMovieContext()

  useEffect(() => {
    fetchMovies()
    fetchTrendingMovies()
    fetchSeries()
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate()

  return (
    <div className='bg-gray-900 text-white '>
      <div className='relative'>
        <div className='swiper-button image-swiper-button-next'>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className='swiper-button image-swiper-button-prev'>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <Swiper
          className='disabled-slide'
          modules={[Navigation, EffectFade, Autoplay]}
          effect='fade'
          autoplay={{ delay: 15000 }}
          navigation={{
            nextEl: '.image-swiper-button-next',
            prevEl: '.image-swiper-button-prev',
            disabledClass: 'swiper-button-disabled'
          }}
          speed={800}
          slidesPerView={1}
          loop
          allowTouchMove
          noSwiping={true}
          noSwipingClass='disabled-slide'>
          {trendingMovies.slice(0, 11).map(trendingMovie => (
            <div key={trendingMovie.id}>
              <SwiperSlide key={trendingMovie.id}>
                <TrendingSwipe
                  trendingMovie={trendingMovie}
                />
              </SwiperSlide>
            </div>
          ))}
          <div className='absolute top-2 px-1 left-2 text-xs xl:top-10 xl:text-lg xl:left-10 lg:top-10 lg:left-10 lg:text-base md:text-sm md:left-10 sm:top-10 sm:left-6 bg-yellow-500 text-black font-semibold font-mono rounded z-10'>Trending Today!</div>
        </Swiper>
      </div>

      <div className='pl-4 pt-6 pb-8'>
        <div className='pt-6 pb-4 font-semibold text-lg xl:text-2xl lg:text-2xl md:text-2xl'>Popular Movies</div>
        <div className='scrollbar flex flex-nowrap gap-2 overflow-x-auto pb-4'>
          {movies.slice(0, 12).map((movie) => (
            <PopularMovies
              key={movie.id}
              movie={movie}
            />
          ))}
          <div className='flex items-center px-12 '>
            <button onClick={() => navigate('/movies')} className='flex text-sm xl:text-lg lg:text-lg items-center gap-1 text-white hover:text-gray-300'>
              <span>View</span>
              <span>More</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className='pt-6 pb-4 font-semibold text-lg xl:text-2xl lg:text-2xl md:text-2xl'>Popular Series</div>
        <div className='scrollbar flex flex-nowrap gap-2 overflow-x-auto pb-4'>
          {series.slice(0, 12).map((serie) => (
            <PopularSeries
              key={serie.id}
              serie={serie}
            />
          ))}
          <div className='flex items-center px-12 '>
            <button onClick={() => navigate('/series')} className='flex text-sm xl:text-lg lg:text-lg items-center gap-1 text-white hover:text-gray-300'>
              <span>View</span>
              <span>More</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home