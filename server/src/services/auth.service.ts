import bcryptjs from "bcryptjs";
import { authRepository } from "@/repositories/auth.repository";
import { generateToken } from "@/utils/jwt";
import { ApiError } from "@/utils/ApiError";
import type { IUser, IUserDocument } from "@/models/user.model";

export class AuthService {
  /**
   * Register a new user.
   */
  async register(userData: Partial<IUser>): Promise<{ token: string; user: Omit<IUser, "password"> }> {
    const { email, password } = userData;

    if (!email || !password) {
      throw ApiError.badRequest("Email and password are required");
    }

    // Check duplicate email
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.badRequest("Email already exists");
    }

    // Hash password with bcryptjs (10 rounds)
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Store user
    const newUser = await authRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    });

    // Convert document to plain object and remove password
    const userObj = newUser.toObject() as IUser;
    delete userObj.password;

    return {
      token,
      user: userObj,
    };
  }

  /**
   * Log in an existing user.
   */
  async login(email: string, password: string): Promise<{ token: string; user: Omit<IUser, "password"> }> {
    if (!email || !password) {
      throw ApiError.badRequest("Email and password are required");
    }

    // Find user by email and select password (since select: false is set in schema)
    const user = await authRepository.findByEmailWithPassword(email);
    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password || "");
    if (!isMatch) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Remove password
    const userObj = user.toObject() as IUser;
    delete userObj.password;

    return {
      token,
      user: userObj,
    };
  }

  /**
   * Get user by ID.
   */
  async getMe(userId: string): Promise<IUserDocument> {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound("User not found");
    }
    return user;
  }
}

export const authService = new AuthService();
