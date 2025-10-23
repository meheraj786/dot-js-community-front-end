import { useState } from 'react';
import { MapPin, Calendar, Link as LinkIcon, Star, MessageSquare, Heart, CheckCircle, Settings, Mail, MoreHorizontal } from 'lucide-react';

type TabType = 'posts' | 'answers' | 'saved' | 'codeblocks';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner: string;
  bio: string;
  location?: string;
  website?: string;
  joinedDate: string;
  verified: boolean;
  stats: {
    posts: number;
    followers: number;
    following: number;
    reputation: number;
  };
}

interface Post {
  id: string;
  type: 'thought' | 'question';
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isAnswered?: boolean;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const userProfile: UserProfile = {
    id: '1',
    name: 'Sarah Chen',
    username: '@sarahchen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop',
    bio: 'Full-stack developer | React enthusiast | Building amazing web experiences ✨ | Open source contributor 🚀',
    location: 'San Francisco, CA',
    website: 'sarahchen.dev',
    joinedDate: '2023-01-15',
    verified: true,
    stats: {
      posts: 142,
      followers: 12500,
      following: 342,
      reputation: 4.8
    }
  };

  const userPosts: Post[] = [
    {
      id: '1',
      type: 'thought',
      content: 'Just discovered the new React 19 features! The use() hook is game-changing. No more useEffect for data fetching. 🚀',
      tags: ['react19', 'javascript', 'webdev'],
      likes: 234,
      comments: 45,
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: '2',
      type: 'question',
      content: 'What are the best practices for handling state management in large React applications?',
      tags: ['react', 'statemanagement', 'architecture'],
      likes: 156,
      comments: 67,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      isAnswered: true
    },
    {
      id: '3',
      type: 'thought',
      content: 'TypeScript makes debugging so much easier. Once you go TypeScript, you never go back! 💙',
      tags: ['typescript', 'javascript', 'developer'],
      likes: 389,
      comments: 52,
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  const tabs = [
    { id: 'posts' as TabType, label: 'Posts', count: userProfile.stats.posts },
    { id: 'answers' as TabType, label: 'Answers', count: 48 },
    { id: 'saved' as TabType, label: 'Saved', count: 23 },
    { id: 'codeblocks' as TabType, label: 'Code Blocks', count: 15 }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-5xl mx-auto">
        {/* Banner */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-yellow-400 to-yellow-600 overflow-hidden">
          <img 
            src={userProfile.banner} 
            alt="Banner" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Profile Header */}
        <div className="px-4 sm:px-6">
          <div className="relative">
            {/* Avatar */}
            <div className="absolute -top-16 sm:-top-20">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-primary bg-gray-900"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <button className="p-2 sm:p-2.5 bg-gray-900 text-gray-300 rounded-full hover:bg-gray-800 transition border border-gray-800">
                <MoreHorizontal size={20} />
              </button>
              <button className="p-2 sm:p-2.5 bg-gray-900 text-gray-300 rounded-full hover:bg-gray-800 transition border border-gray-800">
                <Mail size={20} />
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-900 text-gray-300 rounded-full hover:bg-gray-800 transition font-medium text-sm sm:text-base border border-gray-800">
                <Settings size={18} className="inline mr-2" />
                Edit Profile
              </button>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold transition text-sm sm:text-base ${
                  isFollowing
                    ? 'bg-gray-900 text-white border border-gray-700 hover:bg-gray-800'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Profile Info */}
            <div className="mt-16 sm:mt-20 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{userProfile.name}</h1>
                {userProfile.verified && (
                  <CheckCircle className="text-yellow-400 fill-yellow-400" size={24} />
                )}
              </div>
              <p className="text-gray-400 text-sm sm:text-base mb-4">{userProfile.username}</p>

              <p className="text-gray-200 text-sm sm:text-base mb-4 max-w-2xl">
                {userProfile.bio}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                {userProfile.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    <span>{userProfile.location}</span>
                  </div>
                )}
                {userProfile.website && (
                  <div className="flex items-center gap-1.5">
                    <LinkIcon size={16} />
                    <a href={`https://${userProfile.website}`} className="text-yellow-400 hover:text-yellow-300 transition">
                      {userProfile.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>Joined {formatDate(userProfile.joinedDate)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div>
                  <span className="text-white font-bold text-base sm:text-lg">{userProfile.stats.posts}</span>
                  <span className="text-gray-400 text-sm ml-1">Posts</span>
                </div>
                <button className="hover:underline">
                  <span className="text-white font-bold text-base sm:text-lg">{formatNumber(userProfile.stats.followers)}</span>
                  <span className="text-gray-400 text-sm ml-1">Followers</span>
                </button>
                <button className="hover:underline">
                  <span className="text-white font-bold text-base sm:text-lg">{formatNumber(userProfile.stats.following)}</span>
                  <span className="text-gray-400 text-sm ml-1">Following</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span className="text-white font-bold text-base sm:text-lg">{userProfile.stats.reputation}</span>
                  <span className="text-gray-400 text-sm">Reputation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts Content */}
          <div className="pb-8">
            <div className="space-y-4">
              {userPosts.map((post) => (
                <article key={post.id} className="bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        post.type === 'question'
                          ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                          : 'bg-gray-800 text-gray-300 border border-gray-700'
                      }`}>
                        {post.type === 'question' ? '❓ Question' : '💭 Thought'}
                      </span>
                      {post.type === 'question' && post.isAnswered && (
                        <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-400/20 text-green-400 border border-green-400/30">
                          ✓ Answered
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs sm:text-sm">{formatTime(post.timestamp)}</span>
                  </div>

                  <p className="text-gray-200 text-sm sm:text-base mb-3">{post.content}</p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Heart size={16} />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare size={16} />
                      <span>{formatNumber(post.comments)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}