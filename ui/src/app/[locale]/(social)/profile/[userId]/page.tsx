'use client';

import { use, useState } from 'react';
import {
  Award,
  Briefcase,
  Calendar,
  Camera,
  Check,
  Edit3,
  Globe,
  Grid,
  Heart,
  Image as ImageIcon,
  Link2,
  MapPin,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Pin,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { Link } from '@/libs/I18nNavigation';

type ProfilePageProps = {
  params: Promise<{ locale: string; userId: string }>;
};

export default function ProfilePage(props: ProfilePageProps) {
  const { userId } = use(props.params);
  const isMe = userId === 'me' || userId === 'current';

  // Profile Information State
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    handle: '@alex.dev',
    headline: 'Senior Cloud Solutions Architect & Full-Stack Developer',
    bio: 'Xây dựng các ứng dụng quy mô lớn với AWS Serverless, Next.js và kiến trúc Event-Driven. Đam mê chia sẻ kiến thức mã nguồn mở và cloud computing 🚀☁️',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    company: 'Cloud Architect @ TechGlobal AWS Partner',
    website: 'https://github.com/alex-dev',
    joinedDate: 'Tham gia từ tháng 10, 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop',
    stats: {
      posts: 38,
      friends: 1420,
      likes: 5240,
      media: 96,
    },
  });

  const [activeTab, setActiveTab] = useState<'posts' | 'friends' | 'media' | 'about'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    company: profile.company,
  });

  // User's timeline posts
  const [userPosts, setUserPosts] = useState([
    {
      id: 'p_pin',
      isPinned: true,
      createdAt: '3 ngày trước',
      privacy: 'PUBLIC' as const,
      content:
        '📌 [GHIM] Tổng kết kiến trúc AWS Microservices cho hệ thống mạng xã hội: Áp dụng Amazon DynamoDB Global Tables, S3 Presigned Upload và EventBridge Scheduler. Đạt 99.99% uptime với chi phí tối ưu!',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop',
      likes: 154,
      comments: 32,
      hasLiked: true,
    },
    {
      id: 'p_recent',
      isPinned: false,
      createdAt: 'Hôm qua lúc 19:30',
      privacy: 'FRIENDS' as const,
      content:
        'Vừa cập nhật xong module bảo mật Audit Logs tích hợp DynamoDB Single-Table Design. Bây giờ có thể tra cứu lịch sử an ninh O(1) theo User ID và mốc thời gian cực kỳ mượt mà. 🛡️⚡',
      likes: 68,
      comments: 11,
      hasLiked: false,
    },
  ]);

  // User's friends list
  const userFriends = [
    {
      id: '1',
      name: 'Nguyễn Thảo Nhi',
      role: 'DevOps Engineer @ AWS',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      mutualFriends: 18,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Trần Quang Huy',
      role: 'Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      mutualFriends: 32,
      isOnline: true,
    },
    {
      id: '3',
      name: 'Lê Mai Hương',
      role: 'UI/UX Product Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      mutualFriends: 12,
      isOnline: false,
    },
    {
      id: '4',
      name: 'Vũ Quốc Bảo',
      role: 'Backend Node.js Dev',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      mutualFriends: 7,
      isOnline: false,
    },
  ];

  // User's media gallery
  const mediaGallery = [
    { id: 'm1', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600', title: 'AWS Cloud Map' },
    { id: 'm2', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600', title: 'Dashboard Analytics' },
    { id: 'm3', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600', title: 'Cyber Security Matrix' },
    { id: 'm4', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', title: 'Hardware Chip Architecture' },
    { id: 'm5', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600', title: 'Coding Workspace' },
    { id: 'm6', url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600', title: 'Dev Setup' },
  ];

  const handleSaveProfile = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      headline: editForm.headline,
      bio: editForm.bio,
      location: editForm.location,
      company: editForm.company,
    }));
    setIsEditModalOpen(false);
  };

  const handleToggleLike = (postId: string) => {
    setUserPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked: nextLiked,
            likes: nextLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      }),
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. PROFILE HEADER CARD */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900">
        {/* Cover Photo */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-slate-900">
          {/* oxlint-disable-next-line next(no-img-element) */}
          <img
            src={profile.coverImage}
            alt="Cover banner"
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Change Cover Button (for owner) */}
          {isMe && (
            <button
              type="button"
              className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-xl bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-slate-900/80"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Chỉnh sửa ảnh bìa</span>
            </button>
          )}

          {/* Pro Cloud Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-indigo-600/80 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AWS Community Builder</span>
          </div>
        </div>

        {/* Profile Info & Avatar Row */}
        <div className="relative px-4 pb-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 sm:-mt-20">
            {/* Avatar with Ring */}
            <div className="relative inline-block">
              {/* oxlint-disable-next-line next(no-img-element) */}
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-28 w-28 sm:h-36 sm:w-36 rounded-3xl object-cover ring-4 ring-white shadow-xl dark:ring-slate-900"
              />
              <span className="absolute right-1 bottom-1 h-5 w-5 rounded-full bg-emerald-500 ring-3 ring-white dark:ring-slate-900" />

              {isMe && (
                <button
                  type="button"
                  title="Thay đổi ảnh đại diện"
                  className="absolute right-0 bottom-0 rounded-full bg-slate-900 p-2 text-white shadow-md hover:bg-indigo-600 transition"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
              {isMe ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setEditForm({
                        name: profile.name,
                        headline: profile.headline,
                        bio: profile.bio,
                        location: profile.location,
                        company: profile.company,
                      });
                      setIsEditModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-500/20 transition hover:opacity-90 active:scale-95"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Chỉnh sửa hồ sơ</span>
                  </button>

                  <Link
                    href="/settings/audit-logs"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Nhật ký bảo mật</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700"
                  >
                    <Users className="h-4 w-4" />
                    <span>Thêm bạn bè</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Nhắn tin</span>
                  </button>
                </>
              )}

              <button
                type="button"
                title="Tùy chọn khác"
                className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {profile.name}
              </h1>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm" title="Tài khoản xác minh">
                <Check className="h-3 w-3 stroke-[3]" />
              </span>
              <span className="text-sm text-slate-400">{profile.handle}</span>
            </div>

            <p className="mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {profile.headline}
            </p>

            <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed dark:text-slate-300 max-w-2xl">
              {profile.bio}
            </p>

            {/* Badges / Meta Info */}
            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-indigo-500" />
                <span>{profile.company}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-rose-500" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Link2 className="h-4 w-4 text-sky-500" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline dark:text-indigo-400 font-medium"
                >
                  github.com/alex-dev
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{profile.joinedDate}</span>
              </div>
            </div>

            {/* Stats Counter Bar */}
            <div className="mt-6 flex items-center divide-x divide-slate-100 border-t border-slate-100 pt-4 dark:divide-slate-800 dark:border-slate-800">
              <div className="pr-5 sm:pr-8 text-center sm:text-left">
                <span className="block text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {profile.stats.posts}
                </span>
                <span className="text-xs text-slate-400 font-medium">Bài viết</span>
              </div>
              <div className="px-5 sm:px-8 text-center sm:text-left">
                <span className="block text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {profile.stats.friends.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-medium">Bạn bè</span>
              </div>
              <div className="px-5 sm:px-8 text-center sm:text-left">
                <span className="block text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {profile.stats.likes.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-medium">Lượt thích</span>
              </div>
              <div className="pl-5 sm:pl-8 text-center sm:text-left">
                <span className="block text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {profile.stats.media}
                </span>
                <span className="text-xs text-slate-400 font-medium">Ảnh / Media</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROFILE NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white/70 px-4 py-2 rounded-2xl shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70">
        <button
          type="button"
          onClick={() => { setActiveTab('posts'); }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
            activeTab === 'posts'
              ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-950/60 dark:text-indigo-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          <Grid className="h-4 w-4" />
          <span>Bài viết ({profile.stats.posts})</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('friends'); }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
            activeTab === 'friends'
              ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-950/60 dark:text-indigo-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Bạn bè ({profile.stats.friends.toLocaleString()})</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('media'); }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
            activeTab === 'media'
              ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-950/60 dark:text-indigo-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          <ImageIcon className="h-4 w-4" />
          <span>Bộ sưu tập ({profile.stats.media})</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('about'); }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
            activeTab === 'about'
              ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-950/60 dark:text-indigo-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Giới thiệu & Kỹ năng</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: POSTS & TIMELINE */}
      {activeTab === 'posts' && (
        <div className="space-y-5">
          {userPosts.map((post) => (
            <article
              key={post.id}
              className={`rounded-3xl border bg-white/80 p-5 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md dark:bg-slate-900/80 ${
                post.isPinned
                  ? 'border-indigo-200 dark:border-indigo-900/60 ring-1 ring-indigo-500/20'
                  : 'border-slate-200/80 dark:border-slate-800/80'
              }`}
            >
              {/* Pinned Post Badge */}
              {post.isPinned && (
                <div className="mb-3 flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Pin className="h-3.5 w-3.5 fill-current" />
                  <span>Bài viết đã ghim</span>
                </div>
              )}

              {/* Author & Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* oxlint-disable-next-line next(no-img-element) */}
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {profile.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span>{post.createdAt}</span>
                      <span>•</span>
                      {post.privacy === 'PUBLIC' ? (
                        <span className="flex items-center gap-0.5 text-sky-600 dark:text-sky-400">
                          <Globe className="h-3 w-3" /> Công khai
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400">
                          <Users className="h-3 w-3" /> Bạn bè
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Post Content */}
              <p className="mt-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed dark:text-slate-200">
                {post.content}
              </p>

              {/* Media Image */}
              {post.imageUrl && (
                <div className="mt-3.5 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                  {/* oxlint-disable-next-line next(no-img-element) */}
                  <img
                    src={post.imageUrl}
                    alt="Post visual"
                    className="h-72 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <button
                  type="button"
                  onClick={() => { handleToggleLike(post.id); }}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.hasLiked ? 'text-rose-600 dark:text-rose-400' : 'hover:text-rose-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.hasLiked ? 'fill-current text-rose-600' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments} bình luận</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* TAB 2: FRIENDS GRID */}
      {activeTab === 'friends' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userFriends.map((friend) => (
            <div
              key={friend.id}
              className="rounded-3xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* oxlint-disable-next-line next(no-img-element) */}
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                  />
                  {friend.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{friend.name}</h4>
                  <p className="text-xs text-slate-500">{friend.role}</p>
                  <span className="text-[11px] text-slate-400">{friend.mutualFriends} bạn chung</span>
                </div>
              </div>

              <button
                type="button"
                className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-400 transition"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MEDIA GALLERY */}
      {activeTab === 'media' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mediaGallery.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800"
            >
              {/* oxlint-disable-next-line next(no-img-element) */}
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-3">
                <span className="text-xs font-semibold text-white">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ABOUT & SKILLS */}
      {activeTab === 'about' && (
        <div className="space-y-6">
          {/* Tech Stack & Skills */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Kỹ năng & Công nghệ chính
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'Amazon Web Services (AWS)',
                'DynamoDB Global Tables',
                'AWS Lambda Serverless',
                'EventBridge Scheduler',
                'Amazon S3 & CloudFront',
                'Next.js 16 (App Router)',
                'TypeScript & Node.js',
                'NestJS Microservices',
                'Docker & Terraform',
                'PostgreSQL',
                'Tailwind CSS v4',
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              Chứng chỉ chuyên môn
            </h3>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400 font-bold text-xs">
                  AWS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    AWS Certified Solutions Architect – Professional (SAP-C02)
                  </h4>
                  <p className="text-[11px] text-slate-400">Amazon Web Services · Đạt chứng chỉ 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-400 font-bold text-xs">
                  AWS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    AWS Certified DevOps Engineer – Professional (DOP-C02)
                  </h4>
                  <p className="text-[11px] text-slate-400">Amazon Web Services · Đạt chứng chỉ 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Chỉnh sửa thông tin cá nhân
              </h3>
              <button
                type="button"
                onClick={() => { setIsEditModalOpen(false); }}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => { setEditForm({ ...editForm, name: e.target.value }); }}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Chức danh / Headline
                </label>
                <input
                  type="text"
                  value={editForm.headline}
                  onChange={(e) => { setEditForm({ ...editForm, headline: e.target.value }); }}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tiểu sử (Bio)
                </label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => { setEditForm({ ...editForm, bio: e.target.value }); }}
                  className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Địa điểm
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => { setEditForm({ ...editForm, location: e.target.value }); }}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nơi làm việc
                  </label>
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => { setEditForm({ ...editForm, company: e.target.value }); }}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); }}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:opacity-90"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
