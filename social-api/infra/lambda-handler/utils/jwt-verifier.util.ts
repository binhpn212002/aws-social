import * as jwt from 'jsonwebtoken';

export interface DecodedUserToken {
  sub: string; // User ID (UUID v4)
  email?: string;
  role?: string;
}

export function verifyWebSocketToken(token: string): DecodedUserToken | null {
  try {
    const secret = process.env.JWT_ACCESS_SECRET || 'jwt-secret-key';
    const decoded = jwt.verify(token, secret) as any;
    return {
      sub: decoded.sub || decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.warn('[JWT Verify Failed]:', (error as Error).message);
    return null;
  }
}
