// 3rd party
import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Typography
} from '@mui/material';
// local
import { PROFIT_PING_CHART } from './values';
import {
  StyledImage,
  StyledIntroTextContainerRel,
  StyledIntroTextContainerAbs
} from './styles';

export const IntroductoryContent = ({
  onGetStartedClick
}: {
  onGetStartedClick: any;
}) => {
  return (
    <Container sx={{ p: 2 }}>
      <Box component={Paper} sx={{ p: 2 }}>
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
                    onClick={onGetStartedClick}
                    sx={{ float: 'right', marginTop: '25px' }}
                    variant="contained"
                    color="success">
                    GET STARTED
                  </Button>
                  <PayPalButtons
                    style={{ layout: 'horizontal' }}
                  />
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
