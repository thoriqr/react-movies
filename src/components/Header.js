import React from 'react'
import tmdbLogo from '../img/tmdb-logo.svg'

const Header = () => {
  return (
    <header className='sticky top-0 z-30 w-full overflow-hidden p-4 bg-gray-800 text-white'>
      <div className='flex justify-end gap-2 items-center'>
        <div className='text-sm xl:text-lg lg:text-base font-mono font-semibold'>API by</div>
        <a href='https://www.themoviedb.org/' target="_blank" rel="noreferrer">
          <img className='w-[120px]' src={tmdbLogo} alt='' />
        </a>
      </div>
    </header>
  )
}

export default Header