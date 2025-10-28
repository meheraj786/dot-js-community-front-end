import { api } from "./api";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ newPost, id }) => ({
        url: `/comment/commentbypost/${id}`,
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
