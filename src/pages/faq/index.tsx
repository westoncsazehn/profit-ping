// 3rd party
import { Box, Container, CardContent, Typography } from '@mui/material';
import React from 'react';
// local
import { MIN_BOX_PAGE, StyledPaper } from '../common';
import { FAQPointType } from '../../store';
import { faqs } from './values';

const FAQPage = () => (
  <Container>
    <Box component={StyledPaper} sx={MIN_BOX_PAGE}>
      {faqs?.map(({ title, text, component }: FAQPointType) => (
        <CardContent key={title}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          {text ? <Typography variant="body2">{text}</Typography> : null}
          {component || null}
        </CardContent>
      )) || null}
    </Box>
  </Container>
);
export default FAQPage;
