// 3rd party
import React from 'react';
import { Link, styled } from '@mui/material';
// local
import { FAQPointType } from '../../store';

const StyledLink = styled(Link)(() => ({ marginLeft: '5px' }));
export const faqs: FAQPointType[] = [
  {
    title: `What's the purpose of Profit Ping?`,
    text: `Profit Ping servers as a tool to help remind you to take profits
     when a multiplier you set has been hit. For example, if you set a 2x
      multiplier for a crypto asset that's value is 1, then you will receive
       a text once the asset has hit 2.It is not financial advice and what you
        do with the message is entirely of your own volition.`
  },
  {
    title: 'Where does your crypto data come from?',
    text: (
      <>
        We use CoinGecko's API. You can learn more about them
        <StyledLink
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noreferrer">
          here
        </StyledLink>
        .
      </>
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
    text: 'It is a feature to set dark/light mode for this site in your browser.'
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
    text: (
      <>
        We use a third-party service called Twilio. You can learn more about
        them
        <StyledLink
          href="https://www.twilio.com/"
          target="_blank"
          rel="noreferrer">
          here
        </StyledLink>
        .
      </>
    )
  },
  {
    title: `How do you store my data?`,
    text: (
      <>
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
      </>
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
    title: `What decides the coins in the Add Coin list?`,
    text: `We display the top 100 coins by market cap in descending order based
     on Coin Gecko's Api data. If you do not see your coin, then it may have
      moved out of this top 100 range.`
  }
];
