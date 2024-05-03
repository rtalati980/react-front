import React, { useState, useEffect } from 'react';
import './body.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';



 
const fetchData = async () => {
  try {
    const response = await fetch('https://radhakrishnamart.azurewebsites.net/category/api/',{
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
    <div className='parent '>
         <div className='child'>
            <h2>Collections</h2>
            <div className='colpro'>
        {category.map(cat => (
          <div key={cat.catid} className='pro'>
           <Link to={`/collection/${cat.name}`}><img
    src={`https://radhakrishnamart.azurewebsites.net/category/api/images/${getFileName(cat.imgPath)}`}
alt={`${cat.imgPath}`}
  /></Link>
            <div className='textlink'>  <h3>{cat.name} </h3>
         <FaArrowRightLong id='fa'/></div>
          </div>
        ))}
               </div> 
         </div>
    </div>
  )
}

const getFileName = (path) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};