// 3rd party
import React, { ReactNode } from 'react';
import { Box, Typography, Modal, Button, Stack, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type SubscribeModalProps = {
  closeModal: () => void;
  submit: () => void;
  open: boolean;
  title: ReactNode | string;
  description: ReactNode | string;
};
export const SubscribeModal = ({
  closeModal,
  submit,
  open,
  title,
  description
}: SubscribeModalProps) => {
  const theme = useTheme();
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
          boxShadow: 24,
          backgroundColor: `${
            theme.palette.mode === 'dark' ? 'black' : 'white'
          }`,
          p: 4,
          width: 'auto',
          height: 'fit-content',
          color: 'primary',
          border: `1px solid ${
            theme.palette.mode === 'dark' ? 'white' : 'black'
          }`
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
          <Button onClick={submit} variant="contained" color="success">
            Subscribe
          </Button>
          <Button onClick={closeModal} variant="outlined">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
