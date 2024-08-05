// 'use client'

// import { useState, useEffect } from 'react'
// import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
// import { firestore } from '@/firebase'
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from 'firebase/firestore'

// const colors = {
//   lightBlue: '#ADD8E6',
//   darkBlue: '#4682B4',
//   white: '#FFFFFF',
//   primaryRed: '#e63946',
//   dark: '#1d3557',
//   green: '#4CAF50',
// };

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 300,
//   bgcolor: colors.white,
//   border: `2px solid ${colors.primaryRed}`,
//   boxShadow: 24,
//   p: 4,
//   borderRadius: '8px',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 3,
// }

// export default function Home() {
//   const [inventory, setInventory] = useState([])
//   const [open, setOpen] = useState(false)
//   const [itemName, setItemName] = useState('')
//   const [searchQuery, setSearchQuery] = useState('')

//   const updateInventory = async () => {
//     try {
//       const snapshot = query(collection(firestore, 'inventory'))
//       const docs = await getDocs(snapshot)
//       const inventoryList = []
//       docs.forEach((doc) => {
//         inventoryList.push({ name: doc.id, ...doc.data() })
//       })
//       setInventory(inventoryList)
//     } catch (error) {
//       console.error('Error fetching inventory:', error)
//     }
//   }

//   useEffect(() => {
//     updateInventory()
//   }, [])

//   const addItem = async (item) => {
//     try {
//       const docRef = doc(collection(firestore, 'inventory'), item)
//       const docSnap = await getDoc(docRef)
//       if (docSnap.exists()) {
//         const { quantity } = docSnap.data()
//         await setDoc(docRef, { quantity: quantity + 1 })
//       } else {
//         await setDoc(docRef, { quantity: 1 })
//       }
//       await updateInventory()
//     } catch (error) {
//       console.error('Error adding item:', error)
//     }
//   }

//   const removeItem = async (item) => {
//     try {
//       const docRef = doc(collection(firestore, 'inventory'), item)
//       const docSnap = await getDoc(docRef)
//       if (docSnap.exists()) {
//         const { quantity } = docSnap.data()
//         if (quantity === 1) {
//           await deleteDoc(docRef)
//         } else {
//           await setDoc(docRef, { quantity: quantity - 1 })
//         }
//       }
//       await updateInventory()
//     } catch (error) {
//       console.error('Error removing item:', error)
//     }
//   }

//   const handleOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       addItem(itemName)
//       setItemName('')
//       handleClose()
//     }
//   }

//   const filteredInventory = inventory.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div className="container">
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontSize: '1.3rem' }}>
//             Add Item
//           </Typography>
//           <TextField
//             id="outlined-basic"
//             label="Item"
//             variant="outlined"
//             fullWidth
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="input-field"
//             InputProps={{ style: { fontSize: '1rem' } }}
//             InputLabelProps={{ style: { fontSize: '1rem' } }}
//           />
//           <Button
//             variant="contained"
//             onClick={() => {
//               addItem(itemName)
//               setItemName('')
//               handleClose()
//             }}
//             className="btn"
//             sx={{ fontSize: '1rem', backgroundColor: colors.darkBlue }}
//           >
//             Add
//           </Button>
//         </Box>
//       </Modal>
//       <div className="sub-header" style={{ backgroundColor: colors.primaryRed, padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
//         <Typography variant="h3" style={{ fontWeight: 'bold', color: colors.white, textAlign: 'center' }}>
//           Inventory
//         </Typography>
//       </div>
//       <div className="main-content" style={{ backgroundColor: colors.lightBlue, padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
//         <Box
//           sx={{
//             backgroundColor: colors.white,
//             padding: '15px',
//             borderRadius: '8px',
//             marginBottom: '20px',
//             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//             width: '100%',
//             maxWidth: '500px',
//             margin: '0 auto',
//           }}
//         >
//           <Button
//             variant="contained"
//             onClick={handleOpen}
//             className="btn"
//             sx={{ 
//               marginBottom: '15px', 
//               fontSize: '1rem',
//               backgroundColor: colors.darkBlue,
//               '&:hover': {
//                 backgroundColor: colors.primaryRed,
//               },
//               width: '100%',
//             }}
//           >
//             Add New Item
//           </Button>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Search Items"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="input-field"
//             sx={{ 
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: colors.lightBlue,
//                 },
//                 '&:hover fieldset': {
//                   borderColor: colors.darkBlue,
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: colors.darkBlue,
//                 },
//               },
//               '& .MuiInputBase-input': {
//                 fontSize: '0.85rem',
//                 padding: '10px 14px',
//               },
//               '& .MuiInputLabel-root': {
//                 fontSize: '0.85rem',
//               },
//             }}
//           />
//         </Box>
//         <ul className="item-list" style={{ padding: 0, margin: '20px 0 0 0' }}>
//           {filteredInventory.map(({ name, quantity }) => (
//             <li key={name} className="item" style={{ 
//               backgroundColor: colors.white,
//               borderRadius: '8px',
//               padding: '12px',
//               marginBottom: '10px',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//               width: '100%',
//               maxWidth: '500px',
//               margin: '0 auto 10px auto',
//             }}>
//               <Typography variant="h6" color={colors.dark} style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
//                 {name.charAt(0).toUpperCase() + name.slice(1)}
//               </Typography>
//               <Typography variant="body1" color={colors.dark} style={{ fontSize: '1rem' }}>
//                 Quantity: {quantity}
//               </Typography>
//               <Button 
//                 variant="contained" 
//                 onClick={() => removeItem(name)} 
//                 className="btn-remove" 
//                 sx={{ 
//                   fontSize: '0.8rem',
//                   backgroundColor: colors.primaryRed,
//                   '&:hover': {
//                     backgroundColor: colors.darkBlue,
//                   },
//                 }}
//               >
//                 Remove
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore, storage } from '@/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  collection, doc, getDocs, query, setDoc, deleteDoc, getDoc,
} from 'firebase/firestore'
import ImageUploading from 'react-images-uploading'

const colors = {
  lightBlue: '#ADD8E6',
  darkBlue: '#4682B4',
  white: '#FFFFFF',
  primaryRed: '#e63946',
  dark: '#1d3557',
  green: '#4CAF50',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: colors.white,
  border: `2px solid ${colors.primaryRed}`,
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    try {
      const snapshot = query(collection(firestore, 'inventory'))
      const docs = await getDocs(snapshot)
      const inventoryList = []
      docs.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() })
      })
      setInventory(inventoryList)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    }
  }

  const addItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        await setDoc(docRef, { quantity: quantity + 1 })
      } else {
        await setDoc(docRef, { quantity: 1 })
      }
      await updateInventory()
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        if (quantity === 1) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, { quantity: quantity - 1 })
        }
      }
      await updateInventory()
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
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
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" color="#333" textAlign="center">
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f0f0f0"
              paddingX={5}
            >
              <Typography variant="h3" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
