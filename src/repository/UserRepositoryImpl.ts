import { User} from "../model/User";
import { UserRepository } from "./UserRepository";
export class UserRepositoryImpl implements UserRepository {
    private users: User[] = [];
    findAll(): User[] {
        return this.users;
    }
    save(user: User): void {
        this.users.push(user);
    }
    findById(id: string): User | null {
        const user = this.users.find(user => user.id === id);
        return user || null;
    }
    update(id: string, user: User): void {
        const index = this.users.findIndex(user => user.id === id);
        if (index >= 0) {
            this.users[index] = user;
        } else {
            throw new Error(`user with ${id} not found`);
        }
    }
}
