import { useState } from 'react';
import { Code2, Home, Code, Users, Bell, Search, Menu, X, Plus, User, Settings, LogOut } from 'lucide-react';

interface User {
  name: string;
  username: string;
  avatar: string;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notifications] = useState<number>(3);

  // Dummy user data
  const currentUser: User = {
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  };

  const navItems = [
    { icon: Home, label: 'Home', href: '#home', active: true },
    { icon: Code, label: 'Code Blocks', href: '#code', active: false },
    { icon: Users, label: 'Community', href: '#community', active: false },
  ];

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-lg">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl hidden sm:block">
              JS Community
            </span>
            <span className="text-white font-bold text-lg sm:hidden">JSC</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  item.active
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search posts, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon - Mobile/Tablet */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition"
            >
              <Search size={20} />
            </button>

            {/* Create Post Button */}
            <button className="hidden sm:flex items-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
              <Plus size={18} />
              <span className="hidden md:inline">Post</span>
            </button>

            {/* Create Post - Mobile */}
            <button className="sm:hidden p-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition">
              <Plus size={20} />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-800 rounded-lg transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-700"
                />
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-black">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.username}</p>
                  </div>
                  <a href="#profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                    <User size={16} />
                    <span>Profile</span>
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                    <Settings size={16} />
                    <span>Settings</span>
                  </a>
                  <hr className="my-2 border-gray-200" />
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden py-3 border-t border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search posts, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-800">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    item.active
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}