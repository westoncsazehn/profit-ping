import { InstructionsListType } from '../../../store';

export const PROFIT_PING_CHART: string = 'profit-ping-landing-page-chart.jpg';
export const SLIDESHOW_IMAGES: string[] = [
  'profit-ping-portfolio-preview.jpg',
  'profit-ping-add-coin-preview.jpg',
  'profit-ping-portfolio-features-preview.jpg',
  'profit-ping-mobile-message-preview.jpg'
];
export const INSTRUCTIONS_LIST: InstructionsListType[] = [
  {
    title: 'Sign-up',
    text: `Enter your phone number, receive a verification code, and enter it
     into the verification code field.`
  },
  {
    title: 'Setup your portfolio',
    text: `Click on +Add Coin button. Enter the coin's investment details,
     the multiplier you want the investment to reach, then click on submit
      to add to portfolio.`
  },
  {
    title: 'Observe coin in portfolio',
    text: `After you've added your coin, you can see it in the Portfolio
     page's table. Double-check to make sure everything looks accurate.`
  },
  {
    title: 'Wait',
    text: `Step outside and away from the charts. We will observe your
     portfolio's assets for you.`
  },
  {
    title: 'Profit Ping Notification',
    text: `Congrats, you've got a Profit Ping text! One or multiple of your
     coins have hit the multiplier you've set. This is a reminder text to take
     profits if you so choose.`
  }
];
