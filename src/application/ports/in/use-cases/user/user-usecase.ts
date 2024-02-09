import { User } from '../../../../../entities/model/User';
import FindUserByIdCommand from '../../commands/user/find-user-by-id-command'; 
import { UpdateUserCommand } from '../../commands/user/update-user-comman';
import { CreateUserCommand } from '../../commands/user/user-command';
export default interface UserUseCase {
  create(input: CreateUserCommand): Promise<User>
  findAll(): Promise<User[]>
  getUserById(input: FindUserByIdCommand): Promise<User | null>
  updateUser(id: string, input: UpdateUserCommand): Promise<User | null>
}