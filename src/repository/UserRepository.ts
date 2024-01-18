import { User } from "../model/User";
import { uid } from "uid";
export interface UserRepository {

    findAll(): User[];
    save(user: User): void;
    findById(id: string): User | null;
    update(id: string, user: User): void;
}

