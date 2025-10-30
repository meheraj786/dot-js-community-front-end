import { api } from "./api";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/post/posts",
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/post/create",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/post/like/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["Likes"],
    }),
    likesCount: builder.query({
      query: (postId) => `/post/likes-count/${postId}`,
      providesTags: ["Likes"],
    }),
    isLiked: builder.query({
      query: (postId) => `/post/is-liked/${postId}`,
      providesTags: ["Likes"],
    }),
    getTrendingTopics: builder.query({
      query: (params?: { limit?: number; days?: number }) => ({
        url: "/post/trending-topics",
        params,
      }),
      providesTags: ["Post"],
    }),

    getPostsByTag: builder.query({
      query: ({ tag, page = 1, limit = 20 }) => ({
        url: `/post/tag/${tag}`,
        params: { page, limit },
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useLikesCountQuery,
  useIsLikedQuery,
  useGetPostsByTagQuery,
  useGetTrendingTopicsQuery
} = postApi;
