import baseApi from '../baseApi';

const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query({
      query: () => `articles`,
      providesTags: (res) =>
        res?.blogs
          ? [
              ...res.blogs.map(({ id }) => ({
                type: 'articles',
                id,
              })),
              { type: 'articles', id: 'LIST' },
            ]
          : [{ type: 'articles', id: 'LIST' }],
    }),
  }),
});

export default articlesApi;
