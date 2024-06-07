import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudComponent = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name:'name',
    price:'price',
    dicription:'dicription',
    category:'category',
    image:'image'
  });

  // Read operation - Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Create operation
  const createItem = async () => {
    try {
      const response = await axios.post('http://localhost:8080/product/api/add   ', formData);
      setItems([...items, response.data]); // Add new item to state
      setFormData({ /* Reset form data */ });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  // Update operation
  const updateItem = async (id, newData) => {
    try {
      const response = await axios.put(`/api/items/${id}`, newData);
      const updatedItems = items.map(item => (item.id === id ? response.data : item));
      setItems(updatedItems);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Delete operation
  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      {/* Render items and forms for CRUD operations */}
    </div>
  );
};

export default CrudComponent;
