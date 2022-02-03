// 3rd party
import React from 'react';
import { Box, Typography, Modal, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// local
import { PortfolioTableCoin } from '../../../store';

export type RemoveCoinModalProps = {
  coin?: PortfolioTableCoin;
  closeModal: () => void;
  submit: () => void;
  open: boolean;
};
export const RemoveCoinModal = ({
  coin,
  closeModal,
  submit,
  open
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
          width: 400,
          height: 'fit-content',
          color: 'primary'
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Portfolio Coin Removal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you wish to remove {coin?.name || 'this coin'}?
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
