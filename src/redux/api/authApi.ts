import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_URL } from '../../shared/constants';
import { TAuthorizationUser, TRegistrationUser } from '../../types/ApiTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_URL
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: TRegistrationUser) => ({
        url: '/register',
        method: 'POST',
        body
      })
    }),
    loginUser: builder.mutation({
      query: (body: TAuthorizationUser) => ({
        url: '/signin',
        method: 'POST',
        body
      })
    })
  })
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
