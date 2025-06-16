import { noAuthProcedure, router } from '../trpc.base';

export const quoteRouter = router({
  getRandomQuote: noAuthProcedure.query(async () => {
    return {
      quote: '',
      author: '',
    };
  }),
});
