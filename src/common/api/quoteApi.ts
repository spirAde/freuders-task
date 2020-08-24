import axios from 'common/axios';
import { QuoteResponse } from 'common/slices/quoteSlice';

export const fetchQuoteRequest = (): Promise<QuoteResponse> =>
  axios.post('', {
    action: 'quote',
  });
