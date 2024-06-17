import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';

const SearchSection = ({ onClose }) => {
  return (
    <div className="search-section-overlay">
      <div className="container mt-5">
        <div className="search-section row mb-4">
          <form className="form-inline d-flex flex-direction-row">
            <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
              <FaSearch />
            </button>
          </form>
          <button className="close-search" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
