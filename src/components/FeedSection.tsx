import { useEffect, useState } from "react";
import { Clock, Star, TrendingUp } from "lucide-react";
import PostCard from "./PostCard";
import { useGetPostsQuery } from "../services/postApi";
import { useGetUserQuery } from "../services/userApi";
import PostCardSkeleton from "./PostCardSkeleton";

export default function FeedSection() {
  const { data, isLoading } = useGetPostsQuery(undefined, {
    pollingInterval: 60000,
  });
  const { data: user } = useGetUserQuery();
  console.log(data);

  type SortType = "latest" | "trending" | "top";
  const [sortBy, setSortBy] = useState<SortType>("latest");

  const sortOptions = [
    { value: "latest" as SortType, label: "Latest", icon: Clock },
    { value: "trending" as SortType, label: "Trending", icon: TrendingUp },
    { value: "top" as SortType, label: "Top", icon: Star },
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
        {isLoading && (
          <div className="space-y-4">
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        )}
        <div className="space-y-4">
          {data?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              currentUserId={user?.data?._id}
            />
          ))}
        </div>

        {/* Load More */}
        {/* <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition border border-gray-800">
            Load More Posts
          </button>
        </div> */}
      </div>
    </div>
  );
}
