import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-characters-long'
);

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Convert time string to seconds
function getExpirationSeconds(timeString: string): number {
  const unit = timeString.slice(-1);
  const value = parseInt(timeString.slice(0, -1));

  const units: Record<string, number> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
    w: 604800,
  };

  return value * (units[unit] || 86400);
}

export class AuthService {
  /**
   * Hash a password
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Verify a password against a hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Create a JWT token
   */
  static async createToken(payload: JWTPayload): Promise<string> {
    const expirationSeconds = getExpirationSeconds(JWT_EXPIRES_IN);

    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + expirationSeconds)
      .sign(JWT_SECRET);

    return token;
  }

  /**
   * Verify a JWT token
   */
  static async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return payload as unknown as JWTPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  /**
   * Set auth cookie
   */
  static async setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    const expirationSeconds = getExpirationSeconds(JWT_EXPIRES_IN);

    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expirationSeconds,
      path: '/',
    });
  }

  /**
   * Get auth token from cookie
   */
  static async getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    return token?.value || null;
  }

  /**
   * Clear auth cookie
   */
  static async clearAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
  }

  /**
   * Get current user from token
   */
  static async getCurrentUser(): Promise<JWTPayload | null> {
    const token = await this.getAuthToken();
    if (!token) return null;

    return this.verifyToken(token);
  }

  /**
   * Require authentication
   */
  static async requireAuth(): Promise<JWTPayload> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }

  /**
   * Require specific role
   */
  static async requireRole(roles: string[]): Promise<JWTPayload> {
    const user = await this.requireAuth();
    if (!roles.includes(user.role)) {
      throw new Error('Forbidden: Insufficient permissions');
    }
    return user;
  }
}

export default AuthService;
