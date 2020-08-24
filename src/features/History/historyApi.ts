import axios from 'common/axios';
import { HistoryResponse } from './historySlice';

export const fetchHistoryRequest = (): Promise<HistoryResponse> =>
  axios.post('', {
    action: 'history',
  });
