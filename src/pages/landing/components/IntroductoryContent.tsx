// 3rd party
import React from 'react';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// local
import { SIGN_IN_URL, StyledPaper } from '../../common';
import { PROFIT_PING_CHART } from './values';
import {
  StyledImage,
  StyledIntroTextContainerRel,
  StyledIntroTextContainerAbs
} from './styles';

export const IntroductoryContent = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ p: 2 }}>
      <Box component={StyledPaper} sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
              <StyledIntroTextContainerRel>
                <StyledIntroTextContainerAbs>
                  <Typography
                    variant="h5"
                    sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Forgetting to take profits?
                  </Typography>
                  <Typography
                    sx={{
                      p: '15px 0 0 0',
                      textIndent: '25px',
                      lineHeight: '1.8rem'
                    }}>
                    Profit Ping is a tool to help remind you to take profit for
                    your key targets. Want to know when BTC hits a 1.5x? We got
                    you covered and will send you a text when it does. Take your
                    time back from chart watching.
                  </Typography>
                  <Button
                    onClick={() => navigate(SIGN_IN_URL)}
                    sx={{ float: 'right', marginTop: '25px' }}
                    variant="contained"
                    color="success">
                    GET STARTED
                  </Button>
                </StyledIntroTextContainerAbs>
              </StyledIntroTextContainerRel>
            </Card>
          </Grid>
          <Grid item xs={12} md={7} sx={{ p: 0 }}>
            <StyledImage
              src={PROFIT_PING_CHART}
              alt="profit ping landing page chart"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
