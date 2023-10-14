import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, BLOGS_LIMIT } from '../../shared/constants';
import { BlogType } from '../../pages/BlogList/BlogList.type';
import { TQueryBlog } from '../../types/ApiTypes';

type BlogListInputData = {
  page: number;
  search: string;
  sorting: string;
};

type ResponseGetTotalBlogs = {
  blogs: BlogType[];
  totalCount: number;
};

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  tagTypes: ['Blogs'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (build) => ({
    getBlogs: build.query<ResponseGetTotalBlogs, BlogListInputData>({
      query: ({ page, search, sorting }) =>
        `/blogs?_page=${page}&_limit=${BLOGS_LIMIT}&q=${search}&_sort=createdAt&_order=${sorting}`,
      transformResponse: (response: BlogType[], meta) => {
        const count = Number(meta?.response?.headers.get('X-Total-Count'));
        return { blogs: response, totalCount: count };
      },
      providesTags: (result) =>
        result?.blogs
          ? [...result.blogs.map(({ id }) => ({ type: 'Blogs' as const, id })), { type: 'Blogs', id: 'LIST' }]
          : [{ type: 'Blogs', id: 'LIST' }]
    }),
    getBlog: build.query<TQueryBlog, string>({
      query: (blogId: string) => `blogs/${blogId}`,
      providesTags: ['Blogs']
    }),
    createBlog: build.mutation({
      query: ({ data }) => ({
        url: `blogs`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Blogs']
    }),
    editingBlog: build.mutation({
      query: ({ body, blogId }) => ({
        url: `blogs/${blogId}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Blogs']
    })
  })
});

export const { useGetBlogsQuery, useGetBlogQuery, useEditingBlogMutation, useCreateBlogMutation } = blogsApi;
