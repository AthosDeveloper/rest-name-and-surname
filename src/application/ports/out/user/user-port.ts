import { User } from "../../../../entities/model/User";
import { UpdateUserCommand } from "../../in/commands/user/update-user-comman";
import { CreateUserCommand } from "../../in/commands/user/user-command";

export interface UserEntityUseCase {
  findAll(): Promise<User[]>;
  save(user: CreateUserCommand): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: UpdateUserCommand): Promise< User | null >;
}
