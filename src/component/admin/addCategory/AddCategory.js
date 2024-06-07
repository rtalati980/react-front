import React, { useState } from 'react';
import '../addpro.css';


const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('images', image);

    try {
      const response = await fetch('https://ec2.radhakrishnamart.com:8443/category/api/save', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Category added successfully');
        setSuccessMessage('Category added successfully');
        // Reset form fields
        setName('');
        setImage(null);
      } else {
        console.log(name ,image);
        console.error('Failed to add category' , response);
        setErrorMessage('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setErrorMessage('Error adding category: ' + error.message);
    }
  };

  return (
    <div className='addFrom'>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
        <label>Image:</label>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
