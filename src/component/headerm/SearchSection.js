import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './headerb.css'; // Import custom CSS for additional styling

const SearchSection = () => {
  return (
    <div className="search-section-container">
      <div className="container">
        <div className="search-section row justify-content-center">
          <form className="form-inline form-search d-flex">
            <input
              className="form-control mr-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success btn-sm" type="submit">
              GO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
