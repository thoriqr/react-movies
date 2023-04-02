import React from 'react'
import { useMovieContext } from '../context';
import { useNavigate } from 'react-router-dom';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faImdb } from '@fortawesome/free-brands-svg-icons'

import MoviePlaceHolder from '../img/img-placeholder.png'
import ProfilePlaceHolder from '../img/no-profile.png'

const ModalSerie = () => {
  const { selectSerie, genres, setSerieGenreName, genreId, setGenreId, setSelectedSerieId, extMedia, trailer, cast, setShowModalSerie, serieGenres, playing, setPlaying,
    setYear, setSearchKey }
    = useMovieContext()

  const navigate = useNavigate()

  const genreClick = (e) => {
    const name = e.target.innerText.replace(',', '');
    setSelectedIdAndGenreId(name)
    setShowModalSerie(false)
    setSerieGenreName(name)
    setYear(undefined)
    setSearchKey('')

    window.scrollTo(0,0)
    navigate('/series', { state: { genreId: genreId } });
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
  };

  const setSelectedGenreId = (name) => {
    const selected = serieGenres.find((genre) => genre.name === name);
    selected && setSelectedGenreId(selected.id);
  };


  return (
    <div onClick={() => {
      setShowModalSerie(false);
      setPlaying(false)
    }}
      className='fixed justify-center  items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none text-white'>
      <div className='fixed inset-0 bg-black opacity-10'></div>
      <div onClick={(e) => { e.stopPropagation() }} className='relative w-full max-h-full xl:max-w-5xl xl:max-h-screen lg:max-w-4xl lg:max-h-screen lg:w-auto md:max-w-3xl md:w-auto md:max-h-screen' >
        <div className='relative z-10 border-0 rounded-lg shadow-lg w-full bg-gray-800 outline-none focus:outline-none'>
          <div className='absolute -z-10 '>
            <img className='bg-center bg-cover opacity-0 xl:opacity-20 lg:opacity-20 md:opacity-20'
              alt={selectSerie.title}
              src={`https://image.tmdb.org/t/p/w1280${selectSerie.backdrop_path}`} />
            <div className='gradient'></div>
          </div>
          <button onClick={() => setShowModalSerie(false)} className='absolute top-1 right-3 text-white text-2xl' title='Close'>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className='grid grid-cols-1 place-items-center xl:flex xl:place-items-start lg:flex lg:place-items-start md:flex md:place-items-start px-6 py-8'>
            <img
              className='rounded-md bg-cover bg-center'
              alt={selectSerie.name}
              src={`https://image.tmdb.org/t/p/w342${selectSerie.poster_path}`}
              style={{ height: '450px' }}
              onError={(e) => {
                e.target.src = MoviePlaceHolder;
              }} />
            <div className='pt-2 xl:pl-4 lg:pl-4 md:pl-4'>
              <div className='flex flex-wrap gap-2 text-2xl xl:text-4xl lg:text-3xl'>
                <div className='font-semibold'>{selectSerie.name}</div>
                <div className='font-extralight'> {selectSerie.first_air_date ? `(${selectSerie.first_air_date.slice(0, 4)})` : ""}</div>
              </div>
              <div className='flex flex-wrap gap-2 pt-2 items-center text-base xl:text-lg lg:text-lg md:text-lg'>
                {genres.map((genre, index) => (
                  <button
                    className='text-white hover:text-gray-300'
                    key={genre.id}

                    onClick={(e) => {
                      handleSelectGenre(e);
                      genreClick(e)
                    }}
                  >
                    {genre.name}
                    {index !== genres.length - 1 && ', '}
                  </button>
                ))}
                <div className="border rounded-full w-[0.4rem] h-[0.4rem] bg-white"></div>
                <div>{selectSerie.episode_run_time ? `${Math.floor(selectSerie.episode_run_time / 60)}hr ${selectSerie.episode_run_time % 60}m` : '???'}</div>
              </div>
              <div className='flex gap-2 pt-2 items-center text-base xl:text-lg lg:text-lg md:text-lg'>
                <div>Rating:</div>
                <div className=" bg-black px-2 rounded-md border border-white">
                  <div className="">{Math.round(selectSerie.vote_average * 10)}</div>
                </div>
                <div className="border rounded-full w-[0.4rem] h-[0.4rem] bg-white"></div>
                {trailer ?
                  <button className='bg-black border px-2 rounded-md hover:bg-gray-700 hover:text-white'
                    onClick={() => setPlaying(true)}
                  >
                    <FontAwesomeIcon icon={faPlay} /> Play Trailer
                  </button> :
                  <div><FontAwesomeIcon icon={faVideoSlash} /> No Trailer Available</div>}
              </div>
              {playing &&
                <>
                  <LiteYouTubeEmbed
                    id={trailer.key}
                    wrapperClass='yt-lite'
                    poster='maxresdefault'
                  />
                  <button onClick={() => setPlaying(false)} title='Close' className='absolute z-50 top-2 left-1 text-white hover:text-gray-300 p-2 text-xl'>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </>
              }
              <div className='pt-2'>
                <div className='font-medium pb-1 text-base xl:text-lg lg:text-lg md:text-lg'>Tagline</div>
                <div className='bg-stone-900 p-3 rounded-md '>
                  {selectSerie.tagline ? <div className='text-sm xl:text-base lg:text-base md:text-base font-medium font-serif'>{selectSerie.tagline}</div> :
                    <div className='text-sm xl:text-base lg:text-base md:text-base font-medium font-serif'>No tagline available</div>
                  }
                </div>
                <div className='font-medium pt-2 pb-1 text-base xl:text-lg lg:text-lg md:text-lg'>Overview</div>
                <div className='bg-stone-900 p-3 rounded-md '>
                  {selectSerie.overview ? <div className='text-sm xl:text-base lg:text-base md:text-base font-medium font-serif'>{selectSerie.overview}</div> :
                    <div className='text-sm xl:text-base lg:text-base md:text-base font-medium font-serif'>No overview available</div>
                  }
                </div>
              </div>
              <div className='flex pt-2 gap-3 items-center'>
                <div className='text-base xl:text-lg lg:text-lg md:text-lg'>Media:</div>
                {!extMedia.facebook_id && !extMedia.instagram_id && !extMedia.twitter_id && !extMedia.imdb_id && !selectSerie.homepage ?
                  <div className=''>N/A</div>
                  :
                  <div className='flex gap-3'>
                    {extMedia.facebook_id ? <a title='Visit Facebook' href={`https://www.facebook.com/${extMedia.facebook_id}`} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon className='text-blue-500 rounded-sm' icon={faFacebookSquare} size='2x' />
                    </a> : null}
                    {extMedia.instagram_id ? <a title='Visit Instagram' href={`https://www.instagram.com/${extMedia.instagram_id}`} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon className=' text-pink-400' icon={faInstagramSquare} size='2x' />
                    </a> : null}
                    {extMedia.twitter_id ? <a title='Visit Twitter' href={`https://www.twitter.com/${extMedia.twitter_id}`} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon className='text-blue-400' icon={faTwitterSquare} size='2x' />
                    </a> : null}
                    {extMedia.imdb_id ? <a title='Visit Imdb' href={`https://www.imdb.com/title/${extMedia.imdb_id}`} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon className='bg- text-yellow-300' icon={faImdb} size='2x' />
                    </a> : null}
                    {selectSerie.homepage ? <a className='ml-4' title='Visit Homepage' href={`${selectSerie.homepage}`} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faExternalLinkSquareAlt} size='2x' />
                    </a> : null}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className='scrollbar flex flex-nowrap gap-2 px-6 overflow-x-auto '>
            {cast.slice(0, 15).map(actor => (
              <div className='flex-none w-[150px]' key={actor.credit_id}>
                <img className='rounded-md bg-cover'
                  alt={actor.name}
                  src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                  style={{ height: '225px' }}
                  onError={(e) => { e.target.src = ProfilePlaceHolder }}
                />
                <div className=''>
                  <div className='font-semibold text-sm xl:text-base lg:text-base md:text-base'>{actor.name}</div>
                  <div className='text-xs xl:text-sm lg:text-sm md:text-sm pb-2'>{actor.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>





  )
}

export default ModalSerie