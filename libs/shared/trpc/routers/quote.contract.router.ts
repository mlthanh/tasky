import { router, noAuthProcedure } from '@backend/server/trpc';
export const quoteRouterContract = router({
  getRandomQuote: noAuthProcedure.query(async () => {
    return {
      quote: '',
      author: ''
    };
  })
});
