import { User } from "../../../../../entities/model/User";

export class UpdateUserCommand implements Partial<User> {
    constructor(
        public name?: string,
        public surname?: string,
    ){
        return this;
    }
};
