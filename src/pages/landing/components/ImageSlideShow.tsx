// 3rd party
import React from 'react';
import { Box, Card, CardMedia, Container } from '@mui/material';
// local
import { StyledPaper } from '../../common';

export const ImageSlideShow = ({
  images,
  activeImage
}: {
  images: string[];
  activeImage: string;
}) => (
  <Container sx={{ p: '16px' }}>
    <Box component={StyledPaper}>
      {images &&
        images.map((imageSource: string, index: number) => {
          return (
            <Card
              sx={{
                height: 'fit-content',
                xs: { p: 0 },
                md: { p: 4 },
                display:
                  !imageSource && index === 0
                    ? 'block'
                    : imageSource === activeImage
                    ? 'block'
                    : 'none'
              }}
              key={imageSource + index}>
              <CardMedia
                component="img"
                height="100%"
                image={imageSource}
                alt={imageSource}
              />
            </Card>
          );
        })}
    </Box>
  </Container>
);
