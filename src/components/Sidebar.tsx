import { useState } from 'react';
import { Home, Code, Users, Bookmark, TrendingUp, Hash, ChevronRight, Flame, Sparkles } from 'lucide-react';

interface NavItem {
  icon: any;
  label: string;
  href: string;
  count?: number;
}

interface TrendingTopic {
  tag: string;
  posts: number;
}

interface SuggestedUser {
  name: string;
  username: string;
  avatar: string;
  followers: number;
}

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState<string>('home');

  const mainNavItems: NavItem[] = [
    { icon: Home, label: 'Home', href: 'home' },
    { icon: Code, label: 'Code Blocks', href: 'code' },
    { icon: Users, label: 'Community', href: 'community' },
    { icon: Bookmark, label: 'Saved', href: 'saved', count: 12 },
    { icon: TrendingUp, label: 'Trending', href: 'trending' },
  ];

  const trendingTopics: TrendingTopic[] = [
    { tag: 'react19', posts: 1234 },
    { tag: 'typescript', posts: 892 },
    { tag: 'nextjs', posts: 756 },
    { tag: 'webdev', posts: 645 },
    { tag: 'javascript', posts: 523 },
  ];

  const suggestedUsers: SuggestedUser[] = [
    {
      name: 'Sarah Chen',
      username: '@sarahchen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      followers: 12500
    },
    {
      name: 'Mike Johnson',
      username: '@mikej',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      followers: 8900
    },
    {
      name: 'Alex Rodriguez',
      username: '@alexr',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      followers: 6700
    },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <aside className="w-full fixed lg:w-72 xl:w-80 h-screen top-16 overflow-y-auto bg-black border-r border-gray-800 hidden md:block">
      <div className="p-4 space-y-6">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <button
              key={item.href}
              onClick={() => setActiveNav(item.href)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition group ${
                activeNav === item.href
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="text-sm lg:text-base">{item.label}</span>
              </div>
              {item.count && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    activeNav === item.href
                      ? 'bg-black text-yellow-400'
                      : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Trending Topics */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold text-sm lg:text-base">Trending Topics</h3>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <button
                key={topic.tag}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 transition group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold text-sm">#{index + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <Hash size={14} className="text-gray-500" />
                    <span className="text-white text-sm font-medium group-hover:text-yellow-400 transition">
                      {topic.tag}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{formatNumber(topic.posts)} posts</span>
              </button>
            ))}
          </div>
          <button className="w-full mt-3 text-yellow-400 text-sm font-medium hover:text-yellow-300 transition flex items-center justify-center gap-1">
            See all topics
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Suggested Users */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold text-sm lg:text-base">Suggested for You</h3>
          </div>
          <div className="space-y-3">
            {suggestedUsers.map((user) => (
              <div
                key={user.username}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-700"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.username}</p>
                    <p className="text-gray-600 text-xs">{formatNumber(user.followers)} followers</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-yellow-400 text-black text-xs font-semibold rounded-lg hover:bg-yellow-500 transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-yellow-400 text-sm font-medium hover:text-yellow-300 transition flex items-center justify-center gap-1">
            See more
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <h3 className="text-white font-bold text-sm lg:text-base mb-3">Your Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Posts</span>
              <span className="text-white font-semibold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Followers</span>
              <span className="text-white font-semibold">1.2K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Following</span>
              <span className="text-white font-semibold">342</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Reputation</span>
              <span className="text-yellow-400 font-semibold">★ 4.8</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2 pb-4">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
            <a href="#about" className="hover:text-yellow-400 transition">About</a>
            <span>•</span>
            <a href="#help" className="hover:text-yellow-400 transition">Help</a>
            <span>•</span>
            <a href="#terms" className="hover:text-yellow-400 transition">Terms</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-yellow-400 transition">Privacy</a>
          </div>
          <p className="text-xs text-gray-600">© 2025 JS Community</p>
        </div>
      </div>
    </aside>
  );
}