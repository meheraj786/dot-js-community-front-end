'use client'
import { useState } from 'react';
import { Award, Clock, Code, MessageSquare, Calendar, Zap, BookOpen, Trophy, Target, TrendingUp } from 'lucide-react';

interface TrendingPost {
  id: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
}

interface WeeklyChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  endsIn: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
}

export default function RightSidebar() {
  const trendingPosts: TrendingPost[] = [
    {
      id: '1',
      title: 'Understanding React Server Components in Next.js 14',
      author: '@sarahchen',
      likes: 456,
      comments: 89
    },
    {
      id: '2',
      title: 'TypeScript Best Practices for 2025',
      author: '@mikej',
      likes: 389,
      comments: 67
    },
    {
      id: '3',
      title: 'Building a Design System from Scratch',
      author: '@emilyd',
      likes: 312,
      comments: 54
    },
    {
      id: '4',
      title: 'Optimizing Web Performance with Modern Tools',
      author: '@alexr',
      likes: 278,
      comments: 41
    },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: '1',
      title: 'React 19 Launch Party',
      date: 'Oct 25, 2025',
      time: '6:00 PM EST',
      participants: 234
    },
    {
      id: '2',
      title: 'TypeScript Workshop',
      date: 'Oct 28, 2025',
      time: '3:00 PM EST',
      participants: 156
    },
    {
      id: '3',
      title: 'Web Performance Webinar',
      date: 'Nov 2, 2025',
      time: '5:00 PM EST',
      participants: 89
    },
  ];

  const weeklyChallenge: WeeklyChallenge = {
    id: '1',
    title: 'Build a Real-time Chat App',
    difficulty: 'Medium',
    participants: 342,
    endsIn: '3 days'
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Post',
      description: 'Create your first post',
      icon: '📝',
      progress: 100
    },
    {
      id: '2',
      title: 'Code Master',
      description: 'Share 10 code snippets',
      icon: '💻',
      progress: 60
    },
    {
      id: '3',
      title: 'Community Helper',
      description: 'Answer 20 questions',
      icon: '🤝',
      progress: 45
    },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <aside className="w-full custom-scrollbar lg:w-80 xl:w-96 h-screen fixed top-16 right-0 overflow-y-auto bg-primary border-l border-gray-800 hidden lg:block">
      <div className="p-4 space-y-4">
        {/* Weekly Challenge */}
        <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-xl p-4 border border-yellow-400/30">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold text-base">Weekly Challenge</h3>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">{weeklyChallenge.title}</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(weeklyChallenge.difficulty)}`}>
                  {weeklyChallenge.difficulty}
                </span>
                <span className="text-gray-400 text-xs">
                  {weeklyChallenge.participants} participating
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock size={12} />
                <span>Ends in {weeklyChallenge.endsIn}</span>
              </div>
            </div>
            <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition text-sm">
              Join Challenge
            </button>
          </div>
        </div>

        {/* Hot Posts This Week */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold text-base">Hot This Week</h3>
          </div>
          <div className="space-y-3">
            {trendingPosts.map((post, index) => (
              <button
                key={post.id}
                className="w-full text-left p-2.5 rounded-lg hover:bg-gray-800 transition group"
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <div className="flex items-center justify-center min-w-[20px] h-5 bg-yellow-400/20 rounded text-yellow-400 font-bold text-xs">
                    {index + 1}
                  </div>
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-yellow-400 transition">
                    {post.title}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 ml-7">
                  <span className="text-yellow-400">{post.author}</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} />
                    <span>{formatNumber(post.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold text-base">Upcoming Events</h3>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-yellow-400/30 transition"
              >
                <h4 className="text-white text-sm font-semibold mb-2">{event.title}</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={12} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {event.participants} attending
                  </span>
                  <button className="text-yellow-400 text-xs font-semibold hover:text-yellow-300">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-yellow-400 text-sm font-medium hover:text-yellow-300 transition text-center">
            View all events →
          </button>
        </div>

        {/* Your Achievements */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold text-base">Your Progress</h3>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-semibold">{achievement.title}</h4>
                    <p className="text-gray-400 text-xs">{achievement.description}</p>
                  </div>
                  <span className="text-yellow-400 text-xs font-semibold">
                    {achievement.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-yellow-400 text-sm font-medium hover:text-yellow-300 transition text-center">
            View all achievements →
          </button>
        </div>

        {/* Learning Resources */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold text-base">Learning Hub</h3>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Code className="text-yellow-400" size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">JavaScript Masterclass</p>
                  <p className="text-gray-400 text-xs">24 lessons • Free</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Target className="text-yellow-400" size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">React Best Practices</p>
                  <p className="text-gray-400 text-xs">18 lessons • Free</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2 pb-4">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
            <button className="hover:text-yellow-400 transition">About</button>
            <span>•</span>
            <button className="hover:text-yellow-400 transition">Help</button>
            <span>•</span>
            <button className="hover:text-yellow-400 transition">Terms</button>
            <span>•</span>
            <button className="hover:text-yellow-400 transition">Privacy</button>
          </div>
          <p className="text-xs text-gray-600">© 2025 JS Community</p>
        </div>
      </div>
    </aside>
  );
}