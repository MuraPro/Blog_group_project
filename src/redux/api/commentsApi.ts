import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TArrayComment } from '../../types/ApiTypes';
import { BASE_URL } from '../../shared/constants/api';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getComments: build.query<TArrayComment, string>({
      query: (articleId: string) => `articles/${articleId}/comments`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Comments' as const, id })), { type: 'Comments', id: 'LIST' }]
          : [{ type: 'Comments', id: 'LIST' }]
    }),
    addComments: build.mutation({
      query: ({ comment, articleId }) => ({
        url: `articles/${articleId}/comments`,
        method: 'POST',
        body: comment
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }]
    }),
    deleteComment: build.mutation({
      query: ({ articleId, commentId }) => ({
        url: `articles/${articleId}/comments/${commentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }]
    })
  })
});
export const { useGetCommentsQuery, useAddCommentsMutation, useDeleteCommentMutation } = commentsApi;
