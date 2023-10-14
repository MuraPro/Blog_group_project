import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { blogsApi } from './api/blogsApi';
import { articlesApi } from './api/articlesApi';
import { commentsApi } from './api/commentsApi';
import { userApi } from './api/userApi';
import userReducer from './features/userSlice';

const middlewares = [
  userApi.middleware,
  authApi.middleware,
  blogsApi.middleware,
  articlesApi.middleware,
  commentsApi.middleware
];


const store = configureStore({
  reducer: {
    userState: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
