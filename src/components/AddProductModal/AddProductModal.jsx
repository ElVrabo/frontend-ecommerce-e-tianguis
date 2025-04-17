import React from 'react';
import { Modal, Box } from '@mui/material';

export default function ReusableModal({ open, handleClose, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="[&_.MuiBackdrop-root]:bg-black/50"
    >
      <Box className="
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[var(--modal-width)] h-[var(--modal-height)]
        flex items-center
        bg-background-paper border border-modal rounded-modal p-modal
        overflow-y-auto
      ">
        {children}
      </Box>
    </Modal>
  );
}