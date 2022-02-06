// 3rd party
import React, { ReactNode } from 'react';
import { Box, Typography, Modal, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type RemoveCoinModalProps = {
  closeModal: () => void;
  submit: () => void;
  open: boolean;
  title: ReactNode | string;
  description: ReactNode | string;
};
export const DeleteItemConfirmModal = ({
  closeModal,
  submit,
  open,
  title,
  description
}: RemoveCoinModalProps) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          boxShadow: 24,
          p: 4,
          width: 'auto',
          height: 'fit-content',
          color: 'primary'
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ float: 'right', paddingTop: '25px' }}>
          <Button
            onClick={submit}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}>
            Remove
          </Button>
          <Button onClick={closeModal} color="inherit" variant="contained">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
