import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, quoteReducer } from 'common/slices';
import { historyReducer } from 'features/History';

const rootReducer = combineReducers({
  user: userReducer,
  quote: quoteReducer,
  history: historyReducer,
});

export default rootReducer;
