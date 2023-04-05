import React from 'react'
import { useMovieContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ handleScroll}) => {
  const {fetchMovies, currentPage, setCurrentPage, totalPages} = useMovieContext()

   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchMovies(pageNumber);
    handleScroll(pageNumber)
  };

  const pageNumbers = [];
  const maxPagesToShow = 7;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPageNumber = 1;
  let endPageNumber = totalPages;

  if (totalPages > maxPagesToShow) {
    if (currentPage > halfMaxPagesToShow) {
      startPageNumber = currentPage - halfMaxPagesToShow;
      endPageNumber = currentPage + halfMaxPagesToShow;
      if (endPageNumber > totalPages) {
        endPageNumber = totalPages;
        startPageNumber = totalPages - maxPagesToShow + 1;
      }
    } else {
      endPageNumber = maxPagesToShow;
    }
  }

  for (let i = startPageNumber; i <= endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex justify-center pt-10 gap-2 text-sm xl:text-lg xl:gap-6 lg:text-lg lg:gap-6 md:text-base md:gap-5 items-center font-bold">
      <li className={`items-center ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
      </li>

      {startPageNumber > 1 && (
        <li className='items-center'>
          <button
            className="page-link"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        </li>
      )}

      {startPageNumber > 2 && (
        <li className='items-center'>
          <span className="page-link">...</span>
        </li>
      )}

      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber} className={`items-center rounded-md ${pageNumber === currentPage ? 'bg-white text-black py-1 px-2' : 'bg-black  py-1 px-2'}`}>
          <button
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}

      {endPageNumber < totalPages - 1 && (
        <li className='items-center'>
          <span className="page-link">...</span>
        </li>
      )}

      <li className={`page-item items-center ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </li>
    </ul>
  );
}

export default Pagination