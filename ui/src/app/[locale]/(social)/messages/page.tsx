'use client';

import { Image as ImageIcon, MessageSquareText, Plus, Search, Send, Smile } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState('c1');
  const [inputText, setInputText] = useState('');

  const conversations = [
    {
      id: 'c1',
      name: 'Nguyễn Thảo Nhi',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      lastMessage: 'Mình vừa test xong rồi Nhi, tốc độ upload trực tiếp...',
      time: '14:22',
      unread: 0,
      online: true,
    },
    {
      id: 'c2',
      name: 'AWS Architecture Group',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
      lastMessage: 'Huy: Đã cập nhật spec DynamoDB Single Table',
      time: '11:05',
      unread: 3,
      online: false,
    },
  ];

  const messages = [
    {
      id: 'm1',
      sender: 'them',
      content: 'Chào Alex! Bạn đã kiểm tra tính năng S3 presigned URL chưa?',
      time: '14:20',
    },
    {
      id: 'm2',
      sender: 'me',
      content: 'Mình vừa test xong rồi Nhi, tốc độ upload trực tiếp rất mượt mà!',
      time: '14:22',
    },
    {
      id: 'm3',
      sender: 'them',
      content: 'Tuyệt vời quá! DynamoDB Stream cũng đã bắn event sang Lambda Notification rồi nhé.',
      time: '14:23',
    },
  ];

  return (
    <div className="flex h-[750px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md md:flex-row dark:border-slate-800/80 dark:bg-slate-900/80">
      {/* Conversation List Sidebar */}
      <div className="flex w-full flex-col border-r border-slate-100 md:w-80 dark:border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <MessageSquareText className="h-5 w-5 text-indigo-600" />
            Hội thoại
          </h2>
          <button
            title="Tạo nhóm chat mới"
            className="rounded-full bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-slate-100 p-3 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm hội thoại..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pr-3 pl-9 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex-1 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800/60">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setActiveConversation(c.id);
              }}
              className={`flex cursor-pointer items-center gap-3 p-3.5 transition ${
                activeConversation === c.id
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="relative">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                />
                {c.online && (
                  <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="truncate text-xs font-bold text-slate-900 dark:text-white">
                    {c.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-slate-500">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="rounded-full bg-sky-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {c.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/40 p-4 dark:border-slate-800 dark:bg-slate-800/20">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/40"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Nguyễn Thảo Nhi</h3>
              <p className="text-[11px] text-emerald-500">Đang hoạt động</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  m.sender === 'me'
                    ? 'rounded-br-xs bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-sm'
                    : 'rounded-bl-xs bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                <p>{m.content}</p>
              </div>
              <span className="mt-1 text-[10px] text-slate-400">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 border-t border-slate-100 p-3 dark:border-slate-800">
          <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <ImageIcon className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Smile className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <button
            disabled={!inputText.trim()}
            className="rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
