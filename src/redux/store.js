import { configureStore } from '@reduxjs/toolkit';
import blogsApi from './services/blogsApi';
import articlesApi from './services/articlesApi';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware).concat(articlesApi.middleware),
});
