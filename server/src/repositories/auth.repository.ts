import { User, type IUser, type IUserDocument } from "@/models/user.model";

export class AuthRepository {
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email });
  }

  async findByEmailWithPassword(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email }).select("+password");
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id);
  }

  async create(userData: Partial<IUser>): Promise<IUserDocument> {
    return User.create(userData);
  }
}

export const authRepository = new AuthRepository();
