import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import './addpro.css';
import API_BASE_URL from '../../config';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [rating, setRating] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/category/api/`);
      
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
    formData.append('description', description);
    formData.append('category_id', categoryId);
    formData.append('rating', rating);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/product/api/add`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Product added successfully.');
        setErrorMessage('');
        resetForm();
      } else {
        setErrorMessage('Failed to add product.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error adding product: ' + error.message);
      setSuccessMessage('');
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategoryId('');
    setRating('');
    setImages([]);
  };

  return (
    <div className='addForm'>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label>Description:</label>
        <JoditEditor
          value={description}
          onChange={(newContent) => setDescription(newContent)}
          required
        />
        <label>Category:</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          <option value="">Select category</option>
          {categories.map(category => (
            <option key={category.catid} value={category.catid}>{category.name}</option>
          ))}
        </select>
        <label>Rating:</label>
        <input type="number" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} required />
        <label>Images:</label>
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
