import React, { useState, createContext, useContext } from "react";
import axios from "axios";

const MovieContext = createContext()

export const useMovieContext = () => {
  const context = useContext(MovieContext)
  const API_KEY = "d93f293c631356c7f9ba99fd0002dcc5"
  const DEFAULT_API = "https://api.themoviedb.org/3/"
  const DISCOVER_MOVIE_API = DEFAULT_API + "discover/movie"
  const DISCOVER_SERIES_API = DEFAULT_API + "discover/tv"
  const TRENDING_MOVIE_API = DEFAULT_API + "trending/movie/day"
  const SEARCH_MOVIE = DEFAULT_API + "search/movie"
  const SEARCH_TV = DEFAULT_API + "search/tv"
  const [movies, setMovies] = context.movies
  const [series, setSeries] = context.series
  const [trendingMovies, setTrendingMovies] = context.trendingMovies
  const [genreId, setGenreId] = context.genreId
  const [selectedId, setSelectedId] = context.selectedId
  const [year, setYear] = context.year
  const [trailer, setTrailer] = context.trailer
  const [playing, setPlaying] = context.playing
  const [cast, setCast] = context.cast
  const [genres, setGenres] = context.genres
  const [movieGenreName, setMovieGenreName] = context.movieGenreName
  const [serieGenreName, setSerieGenreName] = context.serieGenreName
  const [selectMovie, setSelectMovie] = context.selectMovie
  const [selectSerie, setSelectSerie] = context.selectSerie
  const [selectedSerieId, setSelectedSerieId] = context.selectedSerieId
  const [searchKey, setSearchKey] = context.searchKey
  const [currentPage, setCurrentPage] = context.currentPage
  const [totalPages, setTotalPages] = context.totalPages
  const [extMedia, setExtMedia] = context.extMedia
  const [showModalMovie, setShowModalMovie] = context.showModalMovie
  const [showModalSerie, setShowModalSerie] = context.showModalSerie
  const [activeStyle, setActiveStyle] = context.activeStyle

  // Discover Movies
  const fetchMovies = async (pageNumber = 1) => {
    const { data } =
      await axios.get(`${searchKey ? SEARCH_MOVIE : DISCOVER_MOVIE_API}`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          with_genres: genreId,
          primary_release_year: year,
          language: 'en-US',
          with_original_language: 'en',
          page: pageNumber,
          total_pages: totalPages
        }
      })
    setSelectMovie(data.results[0])
    if (data.results.length) {
      await fetchSelectMovie(data.results[0].id)
    }
    setMovies(data.results)
    setTotalPages(data.total_pages)
  }

  // Discover Series
  const fetchSeries = async (pageNumber = 1) => {
    const { data } =
      await axios.get(`${searchKey ? SEARCH_TV : DISCOVER_SERIES_API}`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          language: 'en-US',
          with_genres: genreId,
          first_air_date_year: year,
          with_origin_country: 'US',
          with_original_language: 'en',
          page: pageNumber,
          total_pages: totalPages
        }
      })
    setSelectSerie(data.results[0])
    if (data.results.length) {
      await fetchSelectSerie(data.results[0].id)
    }
    setSeries(data.results)
    setTotalPages(data.total_pages)
  }

  // Trending Movies
  const fetchTrendingMovies = async () => {
    const { data } = await axios.get(TRENDING_MOVIE_API, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        with_origin_country: 'US',
        with_original_language: 'en'
      }
    })
    setTrendingMovies(data.results)
  }

  // Select Movies
  const fetchSelectMovie = async (id) => {
    const { data } = await axios.get(`${DEFAULT_API}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: ['videos', 'credits', 'external_ids'].join(','),
      }
    })
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(vid => vid.name === 'Official Trailer')
      setTrailer(trailer ? trailer : data.videos.results[0])
    }
    setGenres(data.genres)
    setExtMedia(data.external_ids)
    setCast(data.credits.cast)
    setSelectMovie(data)
  }

  // Select Series
  const fetchSelectSerie = async (id) => {
    const { data } = await axios.get(`${DEFAULT_API}/tv/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: ['videos', 'credits', 'external_ids'].join(','),
      }
    })
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(vid => vid.name === 'Official Trailer')
      setTrailer(trailer ? trailer : data.videos.results[0])
    }
    setGenres(data.genres)
    setExtMedia(data.external_ids)
    setCast(data.credits.cast)
    setSelectSerie(data)
  }

  const handleSelectMovie = (selectMovie) => {
    fetchSelectMovie(selectMovie.id)
    setSelectMovie(selectMovie)
  }

  const handleSelectSerie = (selectSerie) => {
    fetchSelectSerie(selectSerie.id)
    setSelectSerie(selectSerie)
  }

  // Movie genre
  const movieGenres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
  ]

  // TV/Series genre
  const serieGenres = [
    { "id": 10759, "name": "Action & Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 10762, "name": "Kids" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10763, "name": "News" },
    { "id": 10764, "name": "Reality" },
    { "id": 10765, "name": "Sci-Fi & Fantasy" },
    { "id": 10768, "name": "War & Politics" },
    { "id": 37, "name": "Western" }
  ]

  return {
    fetchMovies, movies, fetchTrendingMovies, trendingMovies, handleSelectMovie, selectMovie,
    fetchSeries, series,  handleSelectSerie, selectSerie,
    searchKey, setSearchKey, genreId, setGenreId, genres, setGenres, totalPages, currentPage, setCurrentPage,
    year, setYear, playing, setPlaying, extMedia, setExtMedia, cast, 
    selectedId ,setSelectedId, setActiveStyle, showModalMovie, setShowModalMovie, showModalSerie, setShowModalSerie,
    activeStyle, movieGenreName, setMovieGenreName,
    selectedSerieId, setSelectedSerieId, movieGenres, serieGenres, serieGenreName, setSerieGenreName, trailer,
  }
}

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [genreId, setGenreId] = useState('')
  const [selectedId, setSelectedId] = useState()
  const [selectedSerieId, setSelectedSerieId] = useState()
  const [year, setYear] = useState(undefined)
  const [trailer, setTrailer] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [genres, setGenres] = useState([])
  const [movieGenreName, setMovieGenreName] = useState('Popular Movies')
  const [serieGenreName, setSerieGenreName] = useState('Popular Series')
  const [cast, setCast] = useState([])
  const [selectMovie, setSelectMovie] = useState({ title: "Loading Movie" })
  const [selectSerie, setSelectSerie] = useState({ title: "Loading TV/Series" })
  const [searchKey, setSearchKey] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(undefined)
  const [extMedia, setExtMedia] = useState({})
  const [showModalMovie, setShowModalMovie] = useState(false);
  const [showModalSerie, setShowModalSerie] = useState(false);
  const [activeStyle, setActiveStyle] = useState({
    background: "white",
    color: "black",
  })

  return (
    <MovieContext.Provider
      value={{
        movies: [movies, setMovies],
        series: [series, setSeries],
        trendingMovies: [trendingMovies, setTrendingMovies],
        genreId: [genreId, setGenreId],
        selectedId: [selectedId, setSelectedId],
        year: [year, setYear],
        trailer: [trailer, setTrailer],
        playing: [playing, setPlaying],
        cast: [cast, setCast],
        selectMovie: [selectMovie, setSelectMovie],
        selectSerie: [selectSerie, setSelectSerie],
        selectedSerieId: [selectedSerieId, setSelectedSerieId],
        genres: [genres, setGenres],
        movieGenreName: [movieGenreName, setMovieGenreName],
        serieGenreName: [serieGenreName, setSerieGenreName],
        searchKey: [searchKey, setSearchKey],
        currentPage: [currentPage, setCurrentPage],
        totalPages: [totalPages, setTotalPages],
        extMedia: [extMedia, setExtMedia],
        showModalMovie: [showModalMovie, setShowModalMovie],
        showModalSerie: [showModalSerie, setShowModalSerie],
        activeStyle: [activeStyle, setActiveStyle]
      }}>
      {children}
    </MovieContext.Provider>
  )
}