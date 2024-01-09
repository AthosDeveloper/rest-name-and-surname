import { User } from "../model/User";
export interface UserRepository {

    findAll(): User[];
    save(user: User): void;
    findById(id: string): User | null;
    update(id: string, user: User): void;
}

