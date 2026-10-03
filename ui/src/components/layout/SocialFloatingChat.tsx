'use client';

import { Maximize2, Minimize2, Send, Smile, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

type SocialFloatingChatProps = {
  isOpen: boolean;
  onClose: () => void;
  activeChatUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
};

export const SocialFloatingChat: React.FC<SocialFloatingChatProps> = ({
  isOpen,
  onClose,
  activeChatUser = {
    id: 'usr_1',
    name: 'Nguyễn Thảo Nhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
  },
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'them',
      content: 'Chào Alex! Bạn đã kiểm tra tính năng S3 presigned URL chưa?',
      time: '14:20',
    },
    {
      id: '2',
      sender: 'me',
      content: 'Mình vừa test xong rồi Nhi, tốc độ upload trực tiếp rất mượt mà!',
      time: '14:22',
    },
  ]);

  if (!isOpen) {
    return null;
  }

  const handleSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'me',
        content: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMessageText('');
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all sm:w-88 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-100 bg-slate-50/80 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            {/* oxlint-disable-next-line next(no-img-element) */}
            <img
              src={activeChatUser.avatar}
              alt={activeChatUser.name}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/50"
            />
            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              {activeChatUser.name}
            </h4>
            <span className="text-[10px] text-emerald-500">Đang hoạt động</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <button
            type="button"
            onClick={() => {
              setIsMinimized(!isMinimized);
            }}
            className="rounded p-1 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700"
          >
            {isMinimized ? (
              <Maximize2 className="h-3.5 w-3.5" />
            ) : (
              <Minimize2 className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Body & Input (when not minimized) */}
      {!isMinimized && (
        <>
          <div className="h-64 space-y-2.5 overflow-y-auto p-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    msg.sender === 'me'
                      ? 'rounded-br-xs bg-gradient-to-r from-indigo-600 to-sky-500 text-white'
                      : 'rounded-bl-xs bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
                <span className="mt-0.5 text-[9px] text-slate-400">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Form Send Message */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-1.5 border-t border-slate-100 p-2 dark:border-slate-800"
          >
            <button
              type="button"
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
            >
              <Smile className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
              placeholder="Nhập tin nhắn..."
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              disabled={!messageText.trim()}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
