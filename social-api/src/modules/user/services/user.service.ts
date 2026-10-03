import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../shared/base.service';
import { User } from '../../../database/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserNotFoundException } from '../../../common/exceptions/user.exception';

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

  async getById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    return this.repository.getRepository().createQueryBuilder('user')
      .where('user.id IN (:...ids)', { ids })
      .getMany();
  }

  async findByEmailOrUsernameOrThrow(identifier: string): Promise<User> {
    const user = await this.repository.findByEmailOrUsername(identifier);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
