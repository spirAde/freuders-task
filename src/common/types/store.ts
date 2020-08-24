import rootReducer from 'app/rootReducer';
import store from 'app/store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
