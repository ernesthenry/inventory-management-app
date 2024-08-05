'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Modal, TextField, Paper } from '@mui/material';
import { firestore, storage } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import ImageUploading from 'react-images-uploading';

const colors = {
  primaryRed: '#e63946',
  lightRed: '#f1aeb5',
  white: '#f1faee',
  offWhite: '#a8dadc',
  dark: '#1d3557',
  green: '#4CAF50',
  blue: '#3f51b5',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const handleImageChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return;
    const imageUrl = await uploadImageToFirebase(images[0].file);
    console.log('Uploaded image URL:', imageUrl);
    // Call your image analysis API here with imageUrl
  };

  const updateInventory = async () => {
    try {
      const snapshot = query(collection(firestore, 'inventory'));
      const docs = await getDocs(snapshot);
      const inventoryList = [];
      docs.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() });
      });
      setInventory(inventoryList);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      await updateInventory();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      await updateInventory();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="sub-header" style={{ backgroundColor: colors.primaryRed, padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <Typography variant="h2" style={{ fontWeight: 'bold', color: colors.white, textAlign: 'center' }}>
          Inventory Items
        </Typography>
      </div>
      <div className="main-content" style={{ backgroundColor: colors.offWhite, padding: '20px', borderRadius: '8px' }}>
        <Box
          sx={{
            backgroundColor: colors.white,
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Button
            variant="contained"
            onClick={handleOpen}
            className="btn"
            sx={{ 
              marginBottom: '20px', 
              fontSize: '1rem',
              backgroundColor: colors.primaryRed,
              '&:hover': {
                backgroundColor: colors.lightRed,
              },
              width: '100%',
            }}
          >
            Add New Item
          </Button>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            sx={{ 
              marginBottom: '20px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.offWhite,
                },
                '&:hover fieldset': {
                  borderColor: colors.primaryRed,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.primaryRed,
                },
              },
            }}
          />
          <ul className="item-list">
            {filteredInventory.map(({ name, quantity }) => (
              <li key={name} className="item">
                <Typography variant="h6" style={{ color: colors.dark }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="body1" style={{ color: colors.dark }}>
                  Quantity: {quantity}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => removeItem(name)} 
                  className="btn-remove" 
                  sx={{ 
                    backgroundColor: colors.dark,
                    '&:hover': {
                      backgroundColor: colors.primaryRed,
                    },
                  }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </Box>
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', backgroundColor: colors.blue }}>
          <Typography variant="h4" style={{ marginBottom: '15px', color: colors.white, fontWeight: 'bold' }}>
            Add by Image
          </Typography>
          <ImageUploading
            multiple
            value={images}
            onChange={handleImageChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                <Button
                  variant="contained"
                  style={{ backgroundColor: colors.white, color: colors.blue, marginRight: '10px' }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: colors.primaryRed, color: colors.white }}
                  onClick={onImageRemoveAll}
                >
                  Remove all images
                </Button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <Button onClick={() => onImageUpdate(index)}>Update</Button>
                      <Button onClick={() => onImageRemove(index)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: colors.green, color: colors.white, marginTop: '10px' }}
          >
            Analyze
          </Button>
        </Paper>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <TextField
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            onClick={() => {
              addItem(itemName);
              setItemName('');
              handleClose();
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
