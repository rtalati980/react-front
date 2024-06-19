import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './headerb.css'; // Import custom CSS for additional styling

const SearchSection = () => {
  return (
    <div className="search-section-container">
      <div className="container">
        <div className="search-section ">
          <form className=" form-search ">
            <div className='row'>

              <div className='col-lg-6 col-md-6' >
              <input
              className="form-control mr-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
              </div>
              <div className='col-lg-6 col-md-6' >
              <button className="btn btn-outline-success btn-sm" type="submit">
              GO
            </button>
               </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
