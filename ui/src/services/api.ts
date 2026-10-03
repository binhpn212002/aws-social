const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Default seeded user credentials for seamless demo/testing
const DEFAULT_USER = {
  identifier: 'alex_dev',
  password: 'Password123@',
};

export type ApiPostAuthor = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string | null;
};

export type ApiPost = {
  id: string;
  content: string;
  privacy: 'PUBLIC' | 'FRIENDS' | 'PRIVATE';
  author: ApiPostAuthor;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  media?: Array<{
    id: string;
    mediaUrl: string;
    mediaType: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type ApiFriend = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  friendshipId: string;
  friendshipSince: string;
};

export type ApiFriendRequest = {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED';
  requester?: ApiPostAuthor;
  addressee?: ApiPostAuthor;
  createdAt: string;
  updatedAt: string;
};

class ApiService {
  private token: string | null = null;
  private isAuthenticating: Promise<string | null> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('social_access_token');
    }
  }

  public setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('social_access_token', token);
      } else {
        localStorage.removeItem('social_access_token');
      }
    }
  }

  public async getToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }

    // Auto-bootstrap login with seeded user if token not found
    if (!this.isAuthenticating) {
      this.isAuthenticating = this.autoLogin();
    }
    return this.isAuthenticating;
  }

  private async autoLogin(): Promise<string | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEFAULT_USER),
      });

      if (!res.ok) {
        return null;
      }

      const json = await res.json();
      const accessToken = json.data?.tokens?.accessToken;
      if (accessToken) {
        this.setToken(accessToken);
        return accessToken;
      }
      return null;
    } catch {
      return null;
    } finally {
      this.isAuthenticating = null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = await this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(
        errorJson.message || `API Error: ${res.status} ${res.statusText}`,
      );
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  }

  // ------------------------------------
  // AUTH
  // ------------------------------------
  async login(identifier: string, password: string) {
    const data = await this.request<{
      user: ApiPostAuthor;
      tokens: { accessToken: string; refreshToken: string };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });

    if (data.tokens?.accessToken) {
      this.setToken(data.tokens.accessToken);
    }
    return data;
  }

  async getMe() {
    return this.request<ApiPostAuthor>('/auth/me');
  }

  // ------------------------------------
  // POSTS & FEED
  // ------------------------------------
  async getNewsFeed(limit = 20, beforeTimestamp?: string) {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (beforeTimestamp) {
      params.append('beforeTimestamp', beforeTimestamp);
    }
    return this.request<{
      items: ApiPost[];
      pagination: {
        nextCursor: string | null;
        hasMore: boolean;
      };
    }>(`/posts/feed?${params.toString()}`);
  }

  async createPost(content: string, privacy: 'PUBLIC' | 'FRIENDS' | 'PRIVATE' = 'PUBLIC') {
    return this.request<ApiPost>('/posts', {
      method: 'POST',
      body: JSON.stringify({ content, privacy }),
    });
  }

  async toggleLike(postId: string) {
    return this.request<{
      liked: boolean;
      likesCount: number;
    }>(`/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  async getUserPosts(userId: string, limit = 20) {
    return this.request<{
      items: ApiPost[];
      pagination: {
        nextCursor: string | null;
        hasMore: boolean;
      };
    }>(`/posts/user/${userId}?limit=${limit}`);
  }

  // ------------------------------------
  // FRIENDS
  // ------------------------------------
  async getFriends(search?: string, page = 1, limit = 20) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) {
      params.append('search', search);
    }
    return this.request<{
      items: ApiFriend[];
      meta: {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
      };
    }>(`/friends?${params.toString()}`);
  }

  async getFriendRequests(type: 'received' | 'sent' = 'received') {
    return this.request<{
      items: ApiFriendRequest[];
      meta: {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
      };
    }>(`/friends/requests?type=${type}`);
  }

  async acceptFriendRequest(requestId: string) {
    return this.request(`/friends/requests/${requestId}/accept`, {
      method: 'PATCH',
    });
  }

  async declineFriendRequest(requestId: string) {
    return this.request(`/friends/requests/${requestId}/decline`, {
      method: 'PATCH',
    });
  }

  async cancelFriendRequest(requestId: string) {
    return this.request(`/friends/requests/${requestId}/cancel`, {
      method: 'DELETE',
    });
  }

  async sendFriendRequest(addresseeId: string) {
    return this.request('/friends/requests', {
      method: 'POST',
      body: JSON.stringify({ addresseeId }),
    });
  }

  async unfriend(friendUserId: string) {
    return this.request(`/friends/${friendUserId}`, {
      method: 'DELETE',
    });
  }

  // ------------------------------------
  // CHAT
  // ------------------------------------
  async getConversations() {
    return this.request<{
      items: Array<{
        id: string;
        type: 'DIRECT' | 'GROUP';
        name?: string;
        avatarUrl?: string;
        members: ApiPostAuthor[];
        lastMessage?: {
          id: string;
          content: string;
          type: string;
          createdAt: string;
          sender: ApiPostAuthor;
        };
        unreadCount: number;
      }>;
    }>('/chat/conversations');
  }

  async getMessages(conversationId: string, limit = 50) {
    return this.request<{
      items: Array<{
        id: string;
        conversationId: string;
        senderId: string;
        content: string;
        type: string;
        createdAt: string;
        sender?: ApiPostAuthor;
      }>;
    }>(`/chat/conversations/${conversationId}/messages?limit=${limit}`);
  }

  async sendMessage(conversationId: string, content: string) {
    return this.request(`/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        conversationId,
        content,
      }),
    });
  }
}

export const api = new ApiService();
