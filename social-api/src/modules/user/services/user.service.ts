import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../shared/base.service';
import { User } from '../../../database/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }

  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    return this.repository.findByEmailOrUsername(identifier);
  }

  async findByIdentifierWithPassword(identifier: string): Promise<User | null> {
    return this.repository.findByIdentifierWithPassword(identifier);
  }

  async checkExisting(email: string, username: string) {
    return this.repository.checkExisting(email, username);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.repository.update(id, { lastLoginAt: new Date() });
  }
}
