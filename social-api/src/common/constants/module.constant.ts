export const TABLE_NAMES = {
  USERS: 'users',
  ROLES: 'roles',
  USER_ROLES: 'user_roles',
  POSTS: 'posts',
  POST_MEDIA: 'post_media',
  POST_LIKES: 'post_likes',
  COMMENTS: 'comments',
  LIKES: 'likes',
  FOLLOWS: 'follows',
  FRIENDSHIPS: 'friendships',
  NOTIFICATIONS: 'notifications',
  SCHEDULED_NOTIFICATIONS: 'scheduled_notifications',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
