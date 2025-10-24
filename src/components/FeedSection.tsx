import { useEffect, useState } from "react";
import type { Post } from "./PostCard";
import { Clock, Star, TrendingUp } from "lucide-react";
import PostCard from "./PostCard";
import { useGetPostsQuery } from "../services/postApi";

export default function FeedSection() {
  const { data, isLoading, isError, error } = useGetPostsQuery(undefined, {pollingInterval: 60000});
  console.log(data);

  type SortType = "latest" | "trending" | "top";
  const [sortBy, setSortBy] = useState<SortType>("latest");

  const sortOptions = [
    { value: "latest" as SortType, label: "Latest", icon: Clock },
    { value: "trending" as SortType, label: "Trending", icon: TrendingUp },
    { value: "top" as SortType, label: "Top", icon: Star },
  ];

  const samplePosts: Post[] = [
    {
      id: "1",
      type: "thought",
      user: {
        id: "1",
        name: "Sarah Chen",
        username: "@sarahchen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        verified: true,
      },
      content:
        "Just discovered the new React 19 features! The use() hook is game-changing. No more useEffect for data fetching. What are your thoughts on this approach? 🚀",
      tags: ["react19", "javascript", "webdev"],
      codeBlocks: [
        {
          id: "1",
          language: "javascript",
          code: `const PostComponent = () => {\n  const data = use(fetchData());\n  return <div>{data.title}</div>;\n};`,
        },
      ],
      likes: 234,
      comments: [
        {
          id: "1",
          user: {
            id: "2",
            name: "Mike Johnson",
            username: "@mikej",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
          },
          content:
            "This is amazing! Finally, a cleaner way to handle async data.",
          likes: 12,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
      shares: 45,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      isLiked: false,
      isSaved: false,
    },
    {
      id: "2",
      type: "question",
      user: {
        id: "3",
        name: "Alex Rodriguez",
        username: "@alexr",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      content:
        "How do I properly handle authentication in Next.js 14 with App Router? Should I use middleware or server actions?",
      tags: ["nextjs", "authentication", "help"],
      likes: 89,
      comments: [
        {
          id: "2",
          user: {
            id: "4",
            name: "Emily Davis",
            username: "@emilyd",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
          },
          content:
            "I recommend using NextAuth.js with middleware. It provides a seamless experience.",
          likes: 45,
          timestamp: new Date(Date.now() - 1800000).toISOString(),
        },
      ],
      shares: 23,
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      isLiked: true,
      isSaved: true,
      isAnswered: true,
    },
    {
      id: "3",
      type: "thought",
      user: {
        id: "5",
        name: "David Kim",
        username: "@davidk",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        verified: true,
      },
      content:
        "TypeScript 5.3 is here! The new narrowing capabilities are incredible. Check out this example:",
      tags: ["typescript", "coding", "updates"],
      codeBlocks: [
        {
          id: "2",
          language: "typescript",
          code: `function processValue(value: string | number) {\n  if (typeof value === "string") {\n    console.log(value.toUpperCase());\n  } else {\n    console.log(value.toFixed(2));\n  }\n}`,
        },
      ],
      likes: 567,
      comments: [],
      shares: 89,
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      isLiked: false,
      isSaved: false,
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Sort Options */}
        <div className="mb-6 bg-gray-900 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-white font-bold text-lg sm:text-xl">Feed</h2>
            <div className="flex items-center gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm ${
                    sortBy === option.value
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  <option.icon size={16} />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {data?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition border border-gray-800">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
