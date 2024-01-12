import { UpdateUserCommand } from "../../../application/ports/in/commands/user/update-user-comman";
import { CreateUserCommand } from "../../../application/ports/in/commands/user/user-command";
import { UserEntityUseCase } from "../../../application/ports/out/user/user-port";
import { User } from "../../../entities/model/User";

export class UserPersistenceAdapter implements UserEntityUseCase {
  private users: User[] = [];
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async save(user: User): Promise<User> {
    this.users.push(user);
    return user
  }
  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }
  async update(id: string, user: UpdateUserCommand): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      this.users[index] = {...this.users[index], ...user};
      return this.users[index]
    } else {
      throw new Error(`user with ${id} not found`);
    }
  }
}
