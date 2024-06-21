import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogContent, DialogActions, TextField, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled
} from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import JoditEditor from 'jodit-react';
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
    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/product/api/${productId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    console.log("Deleted product with ID:", productId);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const updateProduct = async (productId, updatedProduct, imageFiles) => {
  try {
    const formData = new FormData();
    if (updatedProduct.name) formData.append('name', updatedProduct.name);
    if (updatedProduct.price) formData.append('price', updatedProduct.price);
    if (updatedProduct.discription) formData.append('description', updatedProduct.discription);
    if (updatedProduct.categoryId) formData.append('category_id', updatedProduct.categoryId);

    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach(file => {
        formData.append('images', file);
      });
    }

    console.log(formData.get('description')); // Debug: log the description field to check its length and content

    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/product/api/${productId}`, {
      method: 'PATCH',
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
  const [updatedProduct, setUpdatedProduct] = useState({ name: '', categoryId: '', discription: '', price: '' });
  const [imageFiles, setImageFiles] = useState([]);

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
    setUpdatedProduct({
      name: product.name,
      categoryId: product.category?.id || '',
      discription: product.discription,
      price: product.price
    });
  };

  const handleUpdate = async () => {
    if (currentProduct && currentProduct.id) {
      const updatedData = await updateProduct(currentProduct.id, updatedProduct, imageFiles);
      setProducts(products.map(product => (product.id === currentProduct.id ? updatedData : product)));
    }
    setIsEditing(false);
    setCurrentProduct(null);
    setImageFiles([]); // Reset image file state after update
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
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
                    {product.images && product.images.length > 0 && (
                      <img src={product.images[0]} alt={product.name} width="50" height="50" />
                    )}
                  </TableCell>
                  <TableCell>{product.discription}</TableCell>
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
              label="Category ID"
              fullWidth
              margin="dense"
              value={updatedProduct.categoryId}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, categoryId: e.target.value })}
            />
            <label>Description</label>
            <JoditEditor
              value={updatedProduct.discription}
              onChange={(newContent) => setUpdatedProduct({ ...updatedProduct, discription: newContent })}
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
