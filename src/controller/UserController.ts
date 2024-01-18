import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepository } from "../repository/UserRepository";
export class UserController {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
        getUsers(req: Request, res: Response): void {
        const users = this.userRepository.findAll();
         res.json(users);
    };
    createUser(req: Request, res: Response): void {
        const user: User = req.body;
        this.userRepository.save(user);
        res.status(200).json(user);
    };
    getUserById(req: Request, res: Response): void {
        const id = req.params.id;
        const user = this.userRepository.findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "user not found" });
        }
    };
    
    updateUser(req: Request, res: Response): void {
        const id = req.params?.id;
        const user: User = req.body;
        try {
            this.userRepository.update(id, user);
            res.status(200).json(user);
        } catch (error) {
            
            res.status(404).json({ message: "user not found"});
        }
    }
};