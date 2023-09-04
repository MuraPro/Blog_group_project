import baseApi from '../baseApi';

const blogsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => `blogs`,
      providesTags: (res) =>
        res?.blogs
          ? [
              ...res.blogs.map(({ id }) => ({
                type: 'blogs',
                id,
              })),
              { type: 'blogs', id: 'LIST' },
            ]
          : [{ type: 'blogs', id: 'LIST' }],
    }),
  }),
});

export default blogsApi;
