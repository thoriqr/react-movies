import React, { useEffect, useRef } from 'react'
import { useMovieContext } from '../context'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SeriesList from '../components/SeriesContent/SeriesList'
import Pagination from '../components/SeriesContent/Pagination'

const Series = () => {
  const { fetchSeries, searchKey, series, setSearchKey, genreId, setGenreId, year, setYear, setCurrentPage, selectedSerieId, setSelectedSerieId,
    setShowModalSerie, activeStyle, setActiveStyle, setPlaying, serieGenres, serieGenreName, setSerieGenreName } = useMovieContext()

  const scrollHere = useRef(null)

  useEffect(() => {
    fetchSeries()
    // eslint-disable-next-line
  }, [genreId, year])

  const genreClickChange = (e) => {
    const name = e.target.innerText.replace(',', '');
    setSerieGenreName(name);
    setSelectedIdAndGenreId(name);
    setYear(undefined)
    setSearchKey('')
    setShowModalSerie(false)
    handleScroll()
  };

  const setSelectedIdAndGenreId = (name) => {
    const selected = serieGenres.find((genre) => genre.name === name);
    setSelectedSerieId(selected.id);
    setGenreId(selected.id);
  };

  const handleSelectGenre = (e) => {
    const name = e.target.innerText;
    setSerieGenreName(name);
    setSelectedGenreId(name);
    handleScroll()
    setCurrentPage(1)
  };

  const setSelectedGenreId = (name) => {
    const selected = serieGenres.find((genre) => genre.name === name);
    selected && setSelectedSerieId(selected.id);
    setGenreId(selected.id);
  };

  const years = Array(24)
    .fill()
    .map((_, i) => new Date().getFullYear() - i);

  const handleYearChange = (e) => {
    setYear(e.target.value)
    handleScroll()
    setCurrentPage(1)
  }

  const handleResetAll = () => {
    setSearchKey("");
    fetchSeries();
    setSerieGenreName("Popular Series");
    setYear(undefined);
    setGenreId("");
    setSelectedSerieId(null);
    setActiveStyle({
      background: "white",
      color: "black",
    });
    setShowModalSerie(false);
    setPlaying(false);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const firstNonWhitespaceIndex = searchKey.search(/\S/);
    let capitalizedSearchKey;
    if (firstNonWhitespaceIndex === -1 || !/[a-zA-Z]/.test(searchKey[firstNonWhitespaceIndex])) {
      capitalizedSearchKey = searchKey.toLowerCase();
    } else {
      capitalizedSearchKey =
        searchKey.slice(0, firstNonWhitespaceIndex) +
        searchKey.charAt(firstNonWhitespaceIndex).toUpperCase() +
        searchKey.slice(firstNonWhitespaceIndex + 1).toLowerCase();
    }
    fetchSeries(1);
    setSerieGenreName(`Search for: ${capitalizedSearchKey}`);
    setCurrentPage(1)
    setSelectedSerieId(activeStyle)
  }

  const handleScroll = () => scrollHere.current.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className='bg-gray-900 text-white '>
      <div ref={scrollHere} className='pt-3'></div>
      <div className='sticky top-12 z-30 pt-4 px-8 '>
        <form onSubmit={handleSearchSubmit}>
          <div className='relative flex items-center text-xs xl:text-base lg:text-base md:text-sm'>
            <input
              type='text'
              className='w-full p-2 pl-4 border-white border text-gray-900 font-medium rounded-l-md'
              placeholder='Search series here...'
              value={searchKey}
              onChange={(e) => { setSearchKey(e.target.value) }}
            />
            <button
              onClick={(e) => { handleScroll(e); setYear(''); setGenreId('') }}
              type='submit'
              className='bg-gray-800 text-white flex items-center gap-2 p-2 border-white border rounded-r-md '>
              <FontAwesomeIcon className='text-white' icon={faSearch} />
              <div>Search</div>
            </button>
          </div>
        </form>
      </div>
      {series.length ? <>
        <div className='pt-4 cursor-default px-8 '>
          <div className='flex border-b border-gray-500 pb-6'>
            <div className='flex flex-wrap justify-center gap-2 pt-6'>
              <button onClick={handleResetAll}
                className='rounded-md p-1 text-xs xl:text-sm lg:text-sm md:text-sm font-semibold border-2 border-white bg-black text-white hover:bg-white hover:text-black'>Reset</button>
              {serieGenres.map((serieGenre) => (
                <button
                  key={serieGenre.id}
                  style={serieGenre.id === selectedSerieId ? activeStyle : {}}
                  onClick={e => {
                    handleSelectGenre(e);
                    genreClickChange(e)
                  }}
                  className='rounded-md p-1 text-xs xl:text-sm lg:text-sm md:text-sm font-semibold border-2 border-white bg-black text-white hover:bg-white hover:text-black'
                >
                  {serieGenre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className=' pt-6 pb-8 px-8 '>
          <div className='flex justify-between font-semibold items-center'>
            <div className='text-lg xl:text-2xl lg:text-2xl md:text-2xl'>{serieGenreName} {year ? `(${year})` : ""}</div>
            <select onChange={handleYearChange} value={year || ''}
              className='text-xs xl:text-base lg:text-base md:text-base border-2 border-white text-white bg-black rounded-md p-1 cursor-pointer  '>
              <option value='' >Select Year</option>
              {years.map((year) => (
                <option className='' key={year.toString()} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div
            className='gap-8 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 justify-items-center pt-8'>
            {series.map((serie) => (
              <SeriesList
                key={serie.id}
                serie={serie}
              />
            ))}
          </div>
          <Pagination
            handleScroll={handleScroll}
          />
        </div>
      </> :
        <div className='h-[80vh] flex justify-center items-center gap-3'>
          <p className='text-lg xl:text-2xl lg:text-2xl md:text-2xl'>Sorry No Series Found</p>
        </div>}
    </div>
  )
}

export default Series
