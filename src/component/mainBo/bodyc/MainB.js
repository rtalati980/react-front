import React, { useState, useEffect } from 'react';
import './body.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';



 
const fetchData = async () => {
  try {
    const response = await fetch('https://ec2.radhakrishnamart.com:8443/category/api/',{
      method: 'GET'
    }
    
    );
   
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};


export default function MainB ({cat}) {
  const [category, setCategory] = useState([]);
  
  

  useEffect(() => {
    const fetchCategory = async () => {
      const fetchedCategory = await fetchData();
      if (fetchedCategory) {
          setCategory(fetchedCategory);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className='collection_section'>
    <div className='container cnt cnt-fl' style={{  }}>
    <div className='text-center' style={{ color: 'white'  }}>
      <h2>Collections</h2>
    </div>
    <div className='row row-cols-2 row-cols-sm-2 row-cols-md-4 justify-content-center '>
      {category.map(cat => (
        <div key={cat.catid} className='col'>
          <div className='box'>
            <Link to={`/collection/${cat.name}`}>
              <img src={`${cat.imgPath}`} className='card-img-top img-fluid' alt={`${cat.imgPath}`} style={{ width: '220px', height: '180px', borderRadius: '10px' }} />
            </Link>
            <div className='card-body'>
              <div className='d-flex flex-row align-items-center'>
                <Link to={`/collection/${cat.name}`} className='btn'>
                  <h5 className='card-title' style={{ color: 'white' }}>{cat.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </div>
  )
}

