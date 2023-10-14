import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TArrayArticle, TQueryArticle } from '../../types/ApiTypes';
import { ARTICLES_PAGE_SIZE, BASE_URL } from '../../shared/constants/api';
import { getTokenFromLocalStorage } from '../../helpers/token';

type ArgumentsGetArticles = { blogId: string; sorting: string; page: number };
type ResponseGetArticles = { articles: TArrayArticle; totalCount: number };

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getArticles: builder.query<ResponseGetArticles, ArgumentsGetArticles>({
      query: ({ blogId, sorting, page = 1 }) =>
        `blogs/${blogId}/articles?_sort=createdAt&_order=${sorting}&_page=${page}&_limit=${ARTICLES_PAGE_SIZE}`,
      transformResponse: (response: TArrayArticle, meta) => {
        const count = Number(meta?.response?.headers.get('X-Total-Count'));
        return { articles: response, totalCount: count };
      },
      providesTags: (result) =>
        result?.articles
          ? [...result.articles.map(({ id }) => ({ type: 'Articles' as const, id })), { type: 'Articles', id: 'LIST' }]
          : [{ type: 'Articles', id: 'LIST' }]
    }),
    getArticle: builder.query<TQueryArticle, { articleId: string }>({
      query: ({ articleId }) => `articles/${articleId}`,
      providesTags: ['Articles']
    }),
    createArticle: builder.mutation({
      query: ({ body, blogId }) => ({
        url: `blogs/${blogId}/articles`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getTokenFromLocalStorage()}`
        },
        body
      }),
      invalidatesTags: ['Articles']
    }),
    editArticle: builder.mutation({
      query: ({ body, blogId, articleId }) => ({
        url: `blogs/${blogId}/articles/${articleId}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${getTokenFromLocalStorage()}`
        },
        body
      }),
      invalidatesTags: ['Articles']
    })
  })
});

export const { useGetArticlesQuery, useCreateArticleMutation, useGetArticleQuery, useEditArticleMutation } =
  articlesApi;
