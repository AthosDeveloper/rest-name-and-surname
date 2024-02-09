  import { Request, Response } from "express";
  import { User } from "../../../../entities/model/User";
  import UserUseCase from "../../../../application/ports/in/use-cases/user/user-usecase";
  import { CreateUserCommand } from "../../../../application/ports/in/commands/user/user-command";
  import { UpdateUserCommand } from "../../../../application/ports/in/commands/user/update-user-comman";
import FindUserByIdCommand from "../../../../application/ports/in/commands/user/find-user-by-id-command";
  export class UserController {
    constructor( private service: UserUseCase) {
    }
    async getUsers(req: Request, res: Response): Promise<void> {
      const users = await this.service.findAll();
      res.json(users);
    }
    async createUser(req: Request, res: Response): Promise<void> {
      const user: User = req.body;

      const payload = new CreateUserCommand(user.id, user.name, user.surname);

      const result = await this.service.create(payload);
      res.status(201).json(user);
    }

    async getUserById(req: Request, res: Response): Promise<void> {
 const id = req.params.id;
 const command = new FindUserByIdCommand(id);
      const user = await this.service.getUserById(command);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    }
    async updateUser(req: Request, res: Response): Promise<void> {
      const id = req.params.id;
      const user: User = req.body;
      const payload = new UpdateUserCommand(user.name, user.surname);
      try {
        await this.service.updateUser(id, payload);
        res.json(payload);
      } catch (error) {
        res.status(404).json({ message: "user not found"});
      }
    }
  };