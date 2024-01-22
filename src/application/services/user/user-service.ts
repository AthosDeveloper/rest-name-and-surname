import { UserPersistenceAdapter } from "../../../adapters/out/database/user-adapter";
import { User } from "../../../entities/model/User";
import { FindUserByIdommand } from "../../ports/in/commands/user/find-user-by-id-command";
import { UpdateUserCommand } from "../../ports/in/commands/user/update-user-comman";
import { CreateUserCommand } from "../../ports/in/commands/user/user-command";
import UserUseCase from "../../ports/in/use-cases/user/user-usecase";

export class UserService implements UserUseCase {
    constructor(
        readonly persistenceAdapter: UserPersistenceAdapter,
      ) {}

    async create(input: CreateUserCommand): Promise<User> {
        return this.persistenceAdapter.save(input)
    }
    async findAll(): Promise<User[]> {
        return this.persistenceAdapter.findAll()
    }
    async getUserById({id}: FindUserByIdommand): Promise<User | null> {
        const result = await this.persistenceAdapter.findById(id)
        return result
    }
    async updateUser(id: string, input: UpdateUserCommand): Promise<User | null> {
        const result = await this.persistenceAdapter.update(id, input)
        return result
    }

}