import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogContent, DialogActions, TextField, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled
} from '@mui/material';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './category.css';

const fetchData = async () => {
  try {
    const response = await fetch('https://ec2.radhakrishnamart.com:8443/category/api/', {
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

const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/category/api/${categoryId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    console.log("Deleted category with ID:", categoryId);
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

const updateCategory = async (categoryId, updatedCategory) => {
  try {
    const formData = new FormData();
    formData.append('name', updatedCategory.name);
    if (updatedCategory.image) {
      formData.append('images', updatedCategory.image);
    }

    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/category/api/id/${categoryId}`, {
      method: 'PATCH',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

const StyledTextField = styled(TextField)`
  &.unique-input .MuiInputBase-root {
    background-color: white;
    border: none;
  }
`;

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({ name: '', image: null });

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await fetchData();
      if (fetchedCategories) {
        setCategories(fetchedCategories);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    await deleteCategory(categoryId);
    setCategories(categories.filter(category => category.catid !== categoryId));
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setUpdatedCategory({
      name: category.name,
      image: null // image will be handled separately
    });
  };

  const handleUpdate = async () => {
    if (currentCategory && currentCategory.catid) {
      const updatedData = await updateCategory(currentCategory.catid, updatedCategory);
      setCategories(categories.map(category => (category.catid === currentCategory.catid ? updatedData : category)));
    }
    setIsEditing(false);
    setCurrentCategory(null);
  };

  const handleImageChange = (e) => {
    setUpdatedCategory({ ...updatedCategory, image: e.target.files[0] });
  };

  return (
    <div className='main'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              category ? (
                <TableRow key={index}>
                  <TableCell>{category.catid}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category.imgPath && (
                      <img src={category.imgPath} alt={category.name} width="50" height="50" />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(category)}><FaEdit /></IconButton>
                    <IconButton onClick={() => handleDelete(category.catid)}><MdDelete /></IconButton>
                  </TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEditing && currentCategory && (
        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
          <DialogContent className="unique-input">
            <StyledTextField
              label="Name"
              fullWidth
              margin="dense"
              value={updatedCategory.name}
              onChange={(e) => setUpdatedCategory({ ...updatedCategory, name: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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
