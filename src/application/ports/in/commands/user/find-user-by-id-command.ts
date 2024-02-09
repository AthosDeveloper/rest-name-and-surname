import { User } from "../../../../../entities/model/User";

export default class FindUserByIdCommand implements Pick<User, 'id'> {
    constructor(
        public id: string,
    ){
        return this;
    }
}
