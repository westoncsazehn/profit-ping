// 3rd party
import React from 'react';
import { Box, Container, CardContent, Typography } from '@mui/material';
// local
import { MIN_BOX_PAGE, StyledPaper } from '../common';
import { FAQPointType } from '../../store';
import { faqs } from "./values";

const FAQPage = () => (
  <Container>
    <Box component={StyledPaper} sx={MIN_BOX_PAGE}>
      {faqs?.map(({ title, text }: FAQPointType) => (
        <CardContent key={title}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">{text}</Typography>
        </CardContent>
      )) || null}
    </Box>
  </Container>
);
export default FAQPage;