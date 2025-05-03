import { noAuthProcedure, router } from '../../server/trpc';
import axios from 'axios';

export const quoteRouter = router({
  getRandomQuote: noAuthProcedure.query(async () => {
    const response = await axios.get('https://zenquotes.io/api/random');
    const [quoteData] = response.data;

    return {
      quote: quoteData.q,
      author: quoteData.a,
    };
  }),
});
