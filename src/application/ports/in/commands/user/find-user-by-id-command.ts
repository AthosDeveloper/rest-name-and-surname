import { User } from "../../../../../entities/model/User";

export class FindUserByIdommand implements Pick<User, 'id'> {
    constructor(
        public id: string,
    ){
        return this
    }
}
