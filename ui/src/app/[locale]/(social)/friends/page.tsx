'use client';

import { Check, UserMinus, Users, X } from 'lucide-react';
import { useState } from 'react';

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'requests' | 'blocked'>('all');

  const friendsList = [
    {
      id: '1',
      name: 'Nguyễn Thảo Nhi',
      role: 'DevOps Engineer @ AWS',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      mutualFriends: 14,
    },
    {
      id: '2',
      name: 'Trần Quang Huy',
      role: 'Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      mutualFriends: 28,
    },
    {
      id: '3',
      name: 'Lê Mai Hương',
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      mutualFriends: 9,
    },
  ];

  const friendRequests = [
    {
      id: 'req_1',
      name: 'Minh Hoàng',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      mutualFriends: 5,
      time: '25 phút trước',
    },
    {
      id: 'req_2',
      name: 'Thu Trang',
      role: 'Cloud Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      mutualFriends: 18,
      time: '2 giờ trước',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <Users className="h-5 w-5 text-indigo-600" />
              Mạng lưới bạn bè
            </h2>
            <p className="text-xs text-slate-500">
              Quản lý bạn bè, lời mời kết bạn và danh sách chặn
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100/80 p-1 dark:bg-slate-800">
            <button
              onClick={() => {
                setActiveTab('all');
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'all'
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Tất cả (248)
            </button>
            <button
              onClick={() => {
                setActiveTab('requests');
              }}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'requests'
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              <span>Lời mời</span>
              <span className="py-0.2 rounded-full bg-rose-500 px-1.5 text-[10px] text-white">
                2
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab('blocked');
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'blocked'
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Đã chặn
            </button>
          </div>
        </div>
      </div>

      {/* Tab: All Friends */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {friendsList.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {friend.name}
                  </h4>
                  <p className="text-xs text-slate-500">{friend.role}</p>
                  <span className="text-[11px] text-slate-400">
                    {friend.mutualFriends} bạn chung
                  </span>
                </div>
              </div>
              <button
                title="Hủy kết bạn"
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700"
              >
                <UserMinus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-3">
          {friendRequests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80"
            >
              <div className="flex items-center gap-3">
                <img
                  src={req.avatar}
                  alt={req.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-sky-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{req.name}</h4>
                  <p className="text-xs text-slate-500">{req.role}</p>
                  <span className="text-[11px] text-slate-400">
                    {req.time} · {req.mutualFriends} bạn chung
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700">
                  <Check className="h-3.5 w-3.5" /> Chấp nhận
                </button>
                <button className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300">
                  <X className="h-3.5 w-3.5" /> Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Blocked */}
      {activeTab === 'blocked' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-8 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-sm font-medium">
            Hiện không có người dùng nào trong danh sách bị chặn.
          </p>
        </div>
      )}
    </div>
  );
}
