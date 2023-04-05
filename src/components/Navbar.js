import React from 'react'
import { useMovieContext } from '../context'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTv } from '@fortawesome/free-solid-svg-icons'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const { setCurrentPage, setSearchKey, setYear, setGenreId, setGenreClickName, setSelectedId, setActiveStyle } = useMovieContext()

  const activeLink = 'text-white py-4 flex-1 border-t-4 border-white  '
  const normalLink = 'text-white py-4 flex-1'

  const handleNavLinkClick = () => {
    setCurrentPage(1);
    setSearchKey("");
    setYear(undefined);
    setGenreId("");
    setGenreClickName("Popular Movies");
    setSelectedId(null);
    setActiveStyle({
      background: "white",
      color: "black",
    });
  };

  return (
    <div className='sticky z-30 bottom-0 bg-gray-800 overflow-hidden'>
      <div className='flex w-full h-full justify-around text-center items-center text-white text-sm xl:text-lg lg:text-base'>
        <NavLink to='/'
          onClick={handleNavLinkClick}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <FontAwesomeIcon icon={faHome} />
          <span className='pl-2'>Home</span>
        </NavLink>
        <NavLink to='movies'
          onClick={handleNavLinkClick}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <FontAwesomeIcon icon={faClapperboard} />
          <span className='pl-2'>Movies</span>
        </NavLink>
        <NavLink to='series'
          onClick={handleNavLinkClick}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <FontAwesomeIcon icon={faTv} />
          <span className='pl-2'>TV Series</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar