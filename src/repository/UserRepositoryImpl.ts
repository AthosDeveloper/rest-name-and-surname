import { uid } from "uid";
import { User } from "../model/User";
import { UserRepository } from "./UserRepository";
export class UserRepositoryImpl implements UserRepository {

    private users: User[] = [];
    findAll(): User[] {
        return this.users;
    }
    save(user: User): void {
        user.uid = uid();
        this.users.push(user);
    }
    findById(uid: string): User | null {
        const user = this.users.find(user => user.uid === uid);
        return user || null;
    }
    update(uid: string, user: User): void {
        const index = this.users.findIndex(user => user.uid === uid);
        if (index >= 0) {
            this.users[index] = user;
        } else {
            throw new Error(`user with ${uid} not found`);
        }
    }
}
