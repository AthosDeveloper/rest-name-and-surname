import { User } from "../../../../../entities/model/User";

export class CreateUserCommand implements User {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
    ){
        return this
    }
}
