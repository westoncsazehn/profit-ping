// 3rd party
import { Link, styled, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
// local
import { FAQPointType } from '../../store';

const StyledLink = styled(Link)(() => ({ marginLeft: '5px' }));
const PROFIT_PING_CONTACT_EMAIL: ReactNode = (
  <>admin&nbsp;@&nbsp;brainfish.io</>
);

export const faqs: FAQPointType[] = [
  {
    title: `What's the purpose of Profit Ping?`,
    text: `Profit Ping serves as a tool to help remind you to take profits
     when a multiplier you set has been hit. For example, if you set a 2x
      multiplier for a crypto asset that's value is 1, then you will receive
       a text once the asset's value has hit 2. It is not financial advice and
        what you do with the message is entirely of your own volition.`
  },
  {
    title: 'Where does your crypto data come from?',
    component: (
      <Typography variant="body2">
        We use CoinGecko's API. You can learn more about them
        <StyledLink
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noreferrer">
          here
        </StyledLink>
        .
      </Typography>
    )
  },
  {
    title: `My initial investment price seems a little off, why is that?`,
    text: `Crypto prices, volatile in nature, fluctuate throughout the day.
     The price you are seeing in our charts is the price of the coin at that
      day's open.`
  },
  {
    title: `What's that sun/moon icon?`,
    text: `It is a feature to set dark/light mode for this site in your
     browser.`
  },
  {
    title: `Why can I select only from 5 coins on the Add Coin page?`,
    text: `If you see only 5 coins in the select box, then this means you are
     using the free-tier plan. If you subscribe to Profit Ping Plus, then you
      will be able to select from 100 of the top coins, listed by market cap.`
  },
  {
    title: `Why can I only add 2 coins to my portfolio?`,
    text: `If you are only able to add 2 coins to your portfolio, then this
     means you are using the free-tier plan. If you subscribe to Profit Ping
      Plus, then you will be able to add as many coins as you wish to your
      portfolio.`
  },
  {
    title: 'What do you do with my phone number?',
    text: `Your phone number is stored in our database and is used as a unique
     identifier to retrieve the crypto data you entered via the Add Coin page.
      When we see that one of your assets hits the multiplier you designated
       for it, we use your phone number to send your a Profit Ping text
        reminder to take profits.`
  },
  {
    title: `How do you send Profit Ping text messages?`,
    component: (
      <Typography variant="body2">
        We use a third-party service called Twilio. You can learn more about
        them
        <StyledLink
          href="https://www.twilio.com/"
          target="_blank"
          rel="noreferrer">
          here
        </StyledLink>
        .
      </Typography>
    )
  },
  {
    title: `How do you store my data?`,
    component: (
      <Typography variant="body2">
        We use a third-party service called Firebase. You can learn more about
        them
        <StyledLink
          href="https://firebase.google.com/"
          target="_blank"
          rel="noreferrer">
          here
        </StyledLink>
        . We only store your phone number and crypto data that you enter via our
        Add Coin page.
      </Typography>
    )
  },
  {
    title: `What do you do with my data?`,
    text: `We only use the crypto data you manually provide through the Add
     Coin page and the phone number you used to create an account to: Track
      your cryptos' multiplier progress, display the crypto data within the
       Profit Ping app, and to build/send the message that your crypto
        multiplier has been hit.`
  },
  {
    title: `What decides which coins are in the Add Coin list?`,
    text: `We display the top 100 coins by market cap in descending order based
     on Coin Gecko's Api data. If you do not see your coin, then it may have
      moved out of this top 100 range.`
  },
  {
    title: `How can I contact you?`,
    component: (
      <>
        <ol>
          <li>Via Email: {PROFIT_PING_CONTACT_EMAIL}</li>
          <li>With the required subject field: PROFIT-PING-CONTACT-REQUEST</li>
          <li>Any other subject field with be filtered to spam.</li>
        </ol>
      </>
    )
  },
  {
    title: 'How much does the Profit Ping Plus plan cost?',
    text: `$4.99 per month.`
  },
  {
    title: 'How do I cancel my plan?',
    text: `Navigate to our Settings page. Click on Delete Account. This will
     unsubscribe you from our service and remove all data for your account.`
  }
];
