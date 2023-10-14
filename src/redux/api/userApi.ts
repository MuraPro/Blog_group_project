import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../shared/constants/api';
import { TQueryUser } from '../../types/ApiTypes';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getUser: build.query<TQueryUser, string>({
      query: (userId: string) => `users/${userId}`
    })
  })
});
export const { useGetUserQuery } = userApi;
