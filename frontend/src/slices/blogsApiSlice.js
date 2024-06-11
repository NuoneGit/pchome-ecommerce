import { BLOGS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ keyword = '', pageNumber = 1 }) => ({
        url: BLOGS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Blogs"],
    }),
    getBlogDetails: builder.query({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createBlog: builder.mutation({
      query: () => ({
        url: `${BLOGS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),
    uploadBlogImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "DELETE",
      }),
      providesTags: ["Blog"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    getTopBlogs: builder.query({
      query: () => `${BLOGS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useDeleteBlogMutation,
  useCreateCommentMutation,
  useGetTopBlogsQuery,
} = blogsApiSlice;
