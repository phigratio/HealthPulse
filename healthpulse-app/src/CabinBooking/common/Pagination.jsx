import React from "react";
import "./style/Pagination.css";

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="cb-pagination-nav">
      <ul className="cb-pagination-ul">
        {pageNumbers.map((number) => (
          <li key={number} className="cb-pagination-li">
            <button
              onClick={() => paginate(number)}
              className={`cb-pagination-button ${
                currentPage === number ? "current-page" : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
