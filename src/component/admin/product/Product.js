import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogContent, DialogActions, TextField, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled
} from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import './product.css';

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

const updateProduct = async (productId, updatedProduct, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('category', updatedProduct.category);
    formData.append('discription', updatedProduct.description);
    formData.append('price', updatedProduct.price);
    formData.append('image', imageFile);

    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/product/api/${productId}/`, {
      method: 'PUT',
      body: formData
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

const StyledTextField = styled(TextField)`
  &.unique-input .MuiInputBase-root {
    background-color: white;
    border: none;
  }
`;

export default function Product() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ name: '', category: '', description: '', price: '' });
  const [imageFile, setImageFile] = useState(null);

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
    if (currentProduct && currentProduct.id) {
      const updatedData = await updateProduct(currentProduct.id, updatedProduct, imageFile);
      setProducts(products.map(product => (product.id === currentProduct.id ? updatedData : product)));
    }
    setIsEditing(false);
    setCurrentProduct(null);
    setImageFile(null); // Reset image file state after update
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className='main'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              product ? (
                <TableRow key={index}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>
                    <img src={product.images[0]} alt={product.name} width="50" height="50" />
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(product)}><FaEdit /></IconButton>
                    <IconButton onClick={() => handleDelete(product.id)}><MdDelete /></IconButton>
                  </TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEditing && currentProduct && (
        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
          <DialogContent className="unique-input">
            <StyledTextField
              label="Name"
              fullWidth
              margin="dense"
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            />
            <StyledTextField
              label="Category"
              fullWidth
              margin="dense"
              value={updatedProduct.category}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
            />
            <StyledTextField
              label="Description"
              fullWidth
              margin="dense"
              value={updatedProduct.description}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
            />
            <StyledTextField
              label="Price"
              fullWidth
              margin="dense"
              type="number"
              value={updatedProduct.price}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
            />
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              style={{ marginTop: '16px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
