'use client';

import {
  Bookmark,
  Globe,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Smile,
  Users,
  Video,
} from 'lucide-react';
import { useState } from 'react';

type PostItem = {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
    role: string;
  };
  createdAt: string;
  privacy: 'PUBLIC' | 'FRIENDS';
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  hasLiked: boolean;
};

export default function FeedPage() {
  const [quickPostText, setQuickPostText] = useState('');
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: 'p1',
      author: {
        name: 'Trần Quang Huy',
        handle: '@huy.architect',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        role: 'AWS Solutions Architect',
      },
      createdAt: '15 phút trước',
      privacy: 'PUBLIC',
      content:
        'Vừa triển khai xong kiến trúc Serverless Event-Driven hoàn chỉnh kết hợp Amazon DynamoDB Global Tables, Lambda và SQS FIFO! Độ trễ dưới 25ms ở mọi region. Cảm ơn team đã đồng hành 🚀🔥 #AWS #Serverless #Architecture',
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop',
      likes: 42,
      comments: 7,
      hasLiked: true,
    },
    {
      id: 'p2',
      author: {
        name: 'Lê Mai Hương',
        handle: '@huong.uiux',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        role: 'Senior Product Designer',
      },
      createdAt: '1 giờ trước',
      privacy: 'FRIENDS',
      content:
        'Thiết kế giao diện Dark/Light mode mới cho AWS Social Network đã hoàn thành xong bản phác thảo prototype. Mọi người thích tông màu Indigo & Sky hay Slate hơn? Cho mình xin feedback nhé! 🎨✨',
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop',
      likes: 88,
      comments: 19,
      hasLiked: false,
    },
  ]);

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked: nextLiked,
            likes: nextLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      }),
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPostText.trim()) {
      return;
    }

    const newPost: PostItem = {
      id: `p_${Date.now()}`,
      author: {
        name: 'Alex Johnson',
        handle: '@alex.dev',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'Cloud & Fullstack Dev',
      },
      createdAt: 'Vừa xong',
      privacy: 'PUBLIC',
      content: quickPostText,
      likes: 0,
      comments: 0,
      hasLiked: false,
    };

    setPosts([newPost, ...posts]);
    setQuickPostText('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Quick Status / Create Post Box */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <form onSubmit={handleCreatePost}>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <input
              type="text"
              value={quickPostText}
              onChange={(e) => {
                setQuickPostText(e.target.value);
              }}
              placeholder="Bạn đang có ý tưởng gì mới hôm nay?"
              className="flex-1 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              >
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Ảnh/Video</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40"
              >
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Phát trực tiếp</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40"
              >
                <Smile className="h-4 w-4" />
                <span className="hidden sm:inline">Cảm xúc</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={!quickPostText.trim()}
              className="rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
            >
              Đăng ngay
            </button>
          </div>
        </form>
      </div>

      {/* 2. Feed Posts List */}
      <div className="space-y-5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md sm:p-5 dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="cursor-pointer text-sm font-bold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                      {post.author.name}
                    </h4>
                    <span className="text-xs text-slate-400">· {post.author.handle}</span>
                  </div>
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

              <button className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Post Content */}
            <p className="mt-3.5 text-xs leading-relaxed text-slate-800 sm:text-sm dark:text-slate-200">
              {post.content}
            </p>

            {/* Post Media (if any) */}
            {post.imageUrl && (
              <div className="mt-3.5 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                <img
                  src={post.imageUrl}
                  alt="Post visual"
                  className="h-72 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            )}

            {/* Action Bar: Like, Comment, Share, Bookmark */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <button
                onClick={() => {
                  handleToggleLike(post.id);
                }}
                className={`flex items-center gap-1.5 transition-colors ${
                  post.hasLiked
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'hover:text-rose-600 dark:hover:text-rose-400'
                }`}
              >
                <Heart className={`h-4 w-4 ${post.hasLiked ? 'fill-current text-rose-600' : ''}`} />
                <span>{post.likes}</span>
              </button>

              <button className="flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments} bình luận</span>
              </button>

              <button className="flex items-center gap-1.5 transition-colors hover:text-sky-600 dark:hover:text-sky-400">
                <Share2 className="h-4 w-4" />
                <span>Chia sẻ</span>
              </button>

              <button className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
