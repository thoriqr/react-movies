import React from 'react'
import { useMovieContext } from '../../context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ handleScroll}) => {
  const {fetchSeries, currentPage, setCurrentPage, totalPages} = useMovieContext()

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchSeries(pageNumber);
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
    <ul className="flex justify-center gap-8 pt-10  items-center font-bold">
      <li className={`page-item items-center ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
      </li>

      {/* // First page */}
      {/* {startPageNumber > 1 && (
        <li className={`page-item items-center`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        </li>
      )} */}

      {startPageNumber > 2 && (
        <li className={`page-item items-center`}>
          <span className="page-link">...</span>
        </li>
      )}

      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber} className={`page-item items-center ${pageNumber === currentPage ? 'bg-white text-black py-1 px-2' : 'bg-black  py-1 px-2'}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}

      {endPageNumber < totalPages - 1 && (
        <li className={`page-item items-center`}>
          <span className="page-link">...</span>
        </li>
      )}

      {/* Last page number is showing axiosError */}
      {/* {endPageNumber < totalPages && (
        <li className={`page-item items-center`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      )} */}

      <li className={`page-item items-center ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          className="page-link"
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