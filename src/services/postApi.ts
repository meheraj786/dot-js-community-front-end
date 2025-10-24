import { api } from "./api";


export const postApi=api.injectEndpoints({
  endpoints: (builder)=>({
    getPosts: builder.query({
      query: ()=> "/post/posts",
      providesTags: ['Post']
    }),
    createPost: builder.mutation({
      query: (newPost)=> ({
        url: "/post/create",
        method: "POST",
        body: newPost
      }),
      invalidatesTags: ["Post"]
    }),
  })
})

export const {
  useCreatePostMutation,
  useGetPostsQuery
}=postApi