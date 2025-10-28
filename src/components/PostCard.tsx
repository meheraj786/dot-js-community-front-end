import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Code,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useIsLikedQuery,
  useLikePostMutation,
  useLikesCountQuery,
} from "../services/postApi";
import { useCreateCommentMutation } from "../services/commentApi";

type PostType = "thought" | "question";

interface User {
  _id: string;
  name: string;
  username?: string;
  avatar?: string;
  verified?: boolean;
}

interface Comment {
  _id: string;
  author: string | User;
  content: string;
  likes?: string[];
  createdAt: string;
}

export interface Post {
  _id: string;
  type: PostType;
  author: User;
  content: string;
  tags?: string[];
  codeBlock?: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  likesCount?: number;
}

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  currentUser?: User;
}

export default function PostCard({ post, currentUserId, currentUser }: PostCardProps) {
  const [liked, setLiked] = useState<boolean>(
    currentUserId ? post.likes.includes(currentUserId) : false
  );
  const [likeCount, setLikeCount] = useState<number>(post.likes.length);
  const [saved, setSaved] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showCodeBlock, setShowCodeBlock] = useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>('');
  
  const [likePost] = useLikePostMutation();
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  const { data, error, isLoading, isError } = useLikesCountQuery(post?._id);
  const {
    data: isLiked,
    error: likedErr,
    isLoading: isLoadingLiked,
    isError: isLikedErr,
  } = useIsLikedQuery(post?._id);

  const handleLike = () => {
    likePost(post?._id);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    console.log(commentText, currentUserId);
    
    e.preventDefault();
    if (!commentText.trim() || !currentUserId) {
      toast.error('Please write something');
      return;
    }

    try {
      await createComment({ 
        newPost: { content: commentText },
        id: post._id 
      }).unwrap();
      
      toast.success(post.type === "question" ? 'Answer posted!' : 'Opinion posted!');
      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
      toast.error('Failed to post comment');
    }
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const getAvatarUrl = (avatar?: string, username?: string): string => {
    if (avatar) return avatar;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username || 'user'}`;
  };

  const getCommentAuthorName = (author: string | User): string => {
    if (typeof author === 'string') {
      if (currentUser && author === currentUserId) {
        return currentUser.name;
      }
      return post.author.name;
    }
    return author.name || author.username || 'Anonymous';
  };

  const getCommentAuthorAvatar = (author: string | User): string => {
    if (typeof author === 'string') {
      if (currentUser && author === currentUserId) {
        return getAvatarUrl(currentUser.avatar, currentUser.username);
      }
      return getAvatarUrl(post.author.avatar, post.author.username);
    }
    return getAvatarUrl(author.avatar, author.username);
  };

  const isAnswered = post.type === "question" && post.comments.length > 0;

  return (
    <article className="bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <img
              src={getAvatarUrl(post.author.avatar, post.author.username)}
              alt={post.author.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  {post.author.name}
                </h3>
                {post.author.verified && (
                  <CheckCircle
                    className="text-yellow-400 fill-yellow-400"
                    size={16}
                  />
                )}
              </div>
              {post.author.username && (
                <p className="text-xs sm:text-sm text-gray-400">
                  @{post.author.username}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {formatTime(post.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                post.type === "question"
                  ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30"
                  : "bg-gray-800 text-gray-300 border border-gray-700"
              }`}
            >
              {post.type === "question" ? "❓ Question" : "💭 Thought"}
            </span>

            {isAnswered && (
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-400/20 text-green-400 border border-green-400/30">
                ✓ Answered
              </span>
            )}

            <button className="p-2 hover:bg-gray-800 rounded-full transition">
              <MoreHorizontal size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt="Post image"
              className="w-full object-cover max-h-96"
            />
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <button
                key={index}
                className="px-2 sm:px-3 py-1 bg-gray-800 hover:bg-yellow-400/20 text-gray-300 hover:text-yellow-400 rounded-full text-xs font-medium transition border border-gray-700 hover:border-yellow-400/30"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {post.codeBlock && (
          <div className="mb-4">
            <button
              onClick={() => setShowCodeBlock(!showCodeBlock)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-xs sm:text-sm font-medium border border-gray-700"
            >
              <Code size={16} />
              <span>{showCodeBlock ? "Hide" : "View"} Code Block</span>
            </button>

            {showCodeBlock && (
              <div className="mt-3">
                <div className="bg-black rounded-lg p-3 sm:p-4 overflow-x-auto border border-gray-800 custom-scrollbar">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 text-xs font-semibold uppercase">
                      JavaScript
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(post.codeBlock || "")
                      }
                      className="text-gray-500 hover:text-yellow-400 text-xs transition"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="text-green-400 text-xs sm:text-sm">
                    <code>{post.codeBlock}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg transition ${
                isLiked?.isLiked
                  ? "bg-red-500/20 text-red-400"
                  : "hover:bg-gray-800 text-gray-400"
              }`}
            >
              <Heart 
                size={18} 
                className={isLiked?.isLiked ? "fill-red-400" : ""} 
              />
              <span className="text-xs sm:text-sm font-medium">
                {isLoading ? "..." : data?.likesCount ?? post.likesCount ?? 0}
              </span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-400 transition"
            >
              <MessageCircle size={18} />
              <span className="text-xs sm:text-sm font-medium">
                {formatNumber(post.comments.length)}
              </span>
            </button>

            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-400 transition">
              <Share2 size={18} />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                Share
              </span>
            </button>
          </div>

          <button
            onClick={() => setSaved(!saved)}
            className={`p-2 rounded-lg transition ${
              saved
                ? "bg-yellow-400/20 text-yellow-400"
                : "hover:bg-gray-800 text-gray-400"
            }`}
          >
            <Bookmark size={18} className={saved ? "fill-yellow-400" : ""} />
          </button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
            {currentUser ? (
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <div className="flex gap-3">
                  <img
                    src={getAvatarUrl(currentUser.avatar, currentUser.username)}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={post.type === "question" ? "Write your answer..." : "Share your opinion..."}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                      rows={3}
                      disabled={isSubmitting}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!commentText.trim() || isSubmitting}
                        className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold text-sm hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Posting...' : (post.type === "question" ? 'Post Answer' : 'Post Opinion')}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">
                  Please login to {post.type === "question" ? "answer" : "share your opinion"}
                </p>
              </div>
            )}

            {post.comments.length > 0 && (
              <>
                <h4 className="font-semibold text-white text-sm">
                  {post.type === "question" ? "Answers" : "Opinions"} (
                  {post.comments.length})
                </h4>
                {post.comments.slice(0, 3).map((comment) => (
                  <div key={comment._id} className="flex gap-3">
                    <img
                      src={getCommentAuthorAvatar(comment.author)}
                      alt={getCommentAuthorName(comment.author)}
                      className="w-8 h-8 rounded-full border border-gray-700 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white text-xs sm:text-sm">
                            {getCommentAuthorName(comment.author)}
                          </span>
                          {typeof comment.author !== 'string' && comment.author.verified && (
                            <CheckCircle
                              className="text-yellow-400 fill-yellow-400"
                              size={12}
                            />
                          )}
                        </div>
                        <p className="text-gray-200 text-xs sm:text-sm">
                          {comment.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 px-3">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-red-400 transition text-xs">
                          <Heart size={14} />
                          <span>{comment.likes?.length || 0}</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-300 transition text-xs">
                          Reply
                        </button>
                        <span className="text-gray-600 text-xs">
                          {formatTime(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {post.comments.length > 3 && (
                  <button className="text-yellow-400 hover:text-yellow-300 font-medium text-sm transition">
                    View all {post.comments.length}{" "}
                    {post.type === "question" ? "answers" : "opinions"}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
}