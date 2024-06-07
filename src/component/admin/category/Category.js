import React, { useState, useEffect } from 'react';
import './category.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



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

export default function Category() {
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
      const fetchCategory = async () => {
        const fetchedCategory = await fetchData();
        if (fetchedCategory) {
            setCategorys(fetchedCategory);
        }
      };
  
      fetchCategory();
    }, []);

    const handleDelete = async (categoryId) => {
      try {
          const response = await fetch(`http://localhost:3003/categories/${categoryId}`, {
              method: 'DELETE'
          });
          if (response.ok) {
              // If deletion is successful, filter out the deleted category from the state
              setCategorys(categorys.filter(category => category._id !== categoryId));
              console.log('Category deleted successfully');
          } else {
              console.error( categoryId+'Failed to delete category');
          }
      } catch (error) {
          console.error('Error deleting category:', error);
      }
  };
    
      const handleEdit = (categoryId) => {
        // Logic to edit product
        console.log('Editing product with id:', categoryId);
      };

      
      
  return (
    <div className='main'>
         <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categorys.map(category => (
           <tr key={category.catid}>
           <td>{category.catid}</td>
           <td>{category.name}</td>
           <td>
           <td>
  <img src={category.imgPath} alt={category.imgPath} />
</td>

              </td>
              <td>
                <button onClick={() => handleEdit(category._id)}><FaEdit/></button>
                <button onClick={() => handleDelete(category._id)}><MdDelete/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
