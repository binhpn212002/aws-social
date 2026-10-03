'use client';

import {
  Bell,
  Check,
  ChevronDown,
  LogIn,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  UserPlus,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/libs/I18nNavigation';
import type { ApiPostAuthor } from '@/services/api';

type SocialNavbarProps = {
  onOpenCreatePost?: () => void;
  onToggleChatDock?: () => void;
};

type UserDropdownProps = {
  user: ApiPostAuthor;
  onClose: () => void;
  onLogout: () => void;
};

function UserDropdownMenu({ user, onClose, onLogout }: UserDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
        <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{user.fullName}</p>
        <p className="truncate text-xs text-slate-400">@{user.username} · {user.role || 'USER'}</p>
      </div>

      <div className="py-1 text-xs">
        <Link
          href="/profile/me"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <User className="h-4 w-4 text-slate-400" />
          Trang cá nhân
        </Link>
        <Link
          href="/settings/audit-logs"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Nhật ký bảo mật cá nhân
        </Link>
        {user.role === 'ADMIN' && (
          <Link
            href="/admin/audit-logs"
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-amber-600 transition hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
          >
            <ShieldAlert className="h-4 w-4" />
            Quản trị viên (Admin)
          </Link>
        )}
        <Link
          href="/settings/profile"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Settings className="h-4 w-4 text-slate-400" />
          Cài đặt tài khoản
        </Link>
      </div>

      <div className="border-t border-slate-100 pt-1 dark:border-slate-800">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export const SocialNavbar: React.FC<SocialNavbarProps> = ({
  onOpenCreatePost,
  onToggleChatDock,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sampleNotifications = [
    {
      id: '1',
      sender: 'Vũ Quốc Bảo',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      action: 'đã thích bài viết của bạn',
      time: '5 phút trước',
      isRead: false,
    },
    {
      id: '2',
      sender: 'Lê Mai Hương',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      action: 'đã chấp nhận lời mời kết bạn',
      time: '20 phút trước',
      isRead: false,
    },
  ];

  const handleLogoutAction = () => {
    setShowUserMenu(false);
    void logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Search */}
        <div className="flex items-center gap-3 md:gap-5">
          <Link href="/feed" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 text-white shadow-md shadow-indigo-500/25 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-xl font-black tracking-tight text-transparent">
                AWS Social
              </span>
              <span className="ml-1.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                v1.0
              </span>
            </div>
          </Link>

          {/* Search Box */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bạn bè, bài viết, chủ đề..."
              className="h-10 w-64 rounded-full border border-slate-200 bg-slate-100/70 pr-8 pl-9 text-sm text-slate-800 placeholder-slate-400 transition-all focus:w-80 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Center / Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {/* Quick Create Post Button */}
              <button
                type="button"
                onClick={onOpenCreatePost}
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:opacity-95 hover:shadow-md hover:shadow-indigo-500/30 active:scale-95 sm:text-sm"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Tạo bài viết</span>
              </button>

              {/* Quick Messages Icon */}
              <button
                type="button"
                onClick={onToggleChatDock}
                title="Tin nhắn"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/60 text-slate-700 transition hover:bg-slate-200/70 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white shadow">
                  2
                </span>
              </button>

              {/* Notifications Icon & Popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  title="Thông báo"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/60 text-slate-700 transition hover:bg-slate-200/70 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl backdrop-blur-lg sm:w-96 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-100 px-1 pb-2 dark:border-slate-800">
                      <span className="font-bold text-slate-900 dark:text-white">Thông báo</span>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                      >
                        <Check className="h-3 w-3" /> Đánh dấu đã đọc tất cả
                      </button>
                    </div>
                    <div className="mt-2 max-h-80 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
                      {sampleNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        >
                          <Image
                            src={notif.avatar}
                            alt={notif.sender}
                            width={36}
                            height={36}
                            unoptimized
                            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-indigo-500/20"
                          />
                          <div className="flex-1 text-xs">
                            <p className="text-slate-800 dark:text-slate-200">
                              <strong className="font-semibold text-slate-900 dark:text-white">
                                {notif.sender}
                              </strong>{' '}
                              {notif.action}
                            </p>
                            <span className="mt-1 block text-[11px] text-slate-400">{notif.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Avatar & Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 rounded-full p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Image
                    src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user?.fullName ?? 'User'}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
                </button>

                {showUserMenu && user && (
                  <UserDropdownMenu
                    user={user}
                    onClose={() => setShowUserMenu(false)}
                    onLogout={handleLogoutAction}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-indigo-400"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Đăng nhập</span>
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 transition hover:opacity-90 active:scale-95"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Đăng ký</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
