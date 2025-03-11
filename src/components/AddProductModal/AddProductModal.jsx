import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import FormAddProducts from '../../components/Pages/DashboardSeller/FormAddProducts/FormAddProducts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height:'85vh',
    display:'flex',
    alignItemns:'center',
    bgcolor: 'background.paper',
    border: '1px solid white',
    // boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  
  export default function AddProductModal({ open, handleClose }) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <FormAddProducts />
        </Box>
      </Modal>
    );
  }
  