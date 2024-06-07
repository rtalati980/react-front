import React, { useState, useEffect } from 'react';
import './product.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const fetchData = async () => {
  try {
    const response = await fetch('https://ec2.radhakrishnamart.com:8443/product/api/', {
      method: 'GET'
    });
    
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

const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/product/api/${productId}/`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const updateProduct = async (productId, updatedProduct) => {
  try {
    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/product/api/${productId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct)
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export default function Product() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ name: '', category: '', description: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await fetchData();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setUpdatedProduct({ ...product });
  };

  const handleUpdate = async () => {
    const updatedData = await updateProduct(currentProduct.id, updatedProduct);
    setProducts(products.map(product => (product.id === currentProduct.id ? updatedData : product)));
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div className='main'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category.name}</td>
              <td>
                <img src={`${product.images[0]}`} alt={product.name} />
              </td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}><FaEdit /></button>
                <button onClick={() => handleDelete(product.id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className='edit-modal'>
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={updatedProduct.category}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedProduct.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
