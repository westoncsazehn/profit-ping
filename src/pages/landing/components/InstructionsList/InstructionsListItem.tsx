// 3rd party
import React from 'react';
import { Card, Box, CardContent, Typography } from '@mui/material';
// local
import { NumberIcon } from './NumberIcon';
import { InstructionsListTypeWithIndex } from '../../../../store';

export const InstructionsListItem = ({
  instruction: { index, title, text, component }
}: {
  instruction: InstructionsListTypeWithIndex;
}) => (
  <Card sx={{ display: 'flex', padding: '15px' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto 0' }}>
      <NumberIcon number={index} />
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '160px',
        width: '100%'
      }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          {title}
        </Typography>
        <Typography color="text.secondary">{text}</Typography>
        {component ? component : null}
      </CardContent>
    </Box>
  </Card>
);
