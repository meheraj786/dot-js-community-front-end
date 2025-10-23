import { api } from "./api";


export const postApi=api.injectEndpoints({
  endpoints: (builder)=>({
    getPosts: builder.query({
      query: ()=> "/post/posts",
    }),
    createPost: builder.mutation({
      query: (newPost)=> ({
        url: "/post/create",
        method: "POST",
        body: newPost
      }),

    }),
  })
})

export const {
  useCreatePostMutation,
  useGetPostsQuery
}=postApi