import React, { useState, useEffect } from 'react';
import './addpro.css';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://ec2.radhakrishnamart.com:8443/category/api/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('discription', description);
    formData.append('category_id', categoryId);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch('https://ec2.radhakrishnamart.com:8443/product/api/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Product added successfully.');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to add product.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error adding product: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className='addFrom'>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select category</option>
          {categories.map(category => (
            <option key={category.catid} value={category.catid}>{category.name}</option>
          ))}
        </select>
        <label>Images:</label>
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
