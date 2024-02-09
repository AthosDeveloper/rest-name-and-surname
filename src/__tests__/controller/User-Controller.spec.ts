import { Request, Response } from "express";
import UserUseCase from "../../application/ports/in/use-cases/user/user-usecase";
import { CreateUserCommand } from "../../application/ports/in/commands/user/user-command";
import { UpdateUserCommand } from "../../application/ports/in/commands/user/update-user-comman";
import { UserController } from "../../adapters/in/controller/user/controller";
import FindUserByIdCommand from "../../application/ports/in/commands/user/find-user-by-id-command";
jest.mock("../../application/ports/in/use-cases/user/user-usecase");
const mockUserUseCase: Partial<UserUseCase> = {
  findAll: jest.fn(),
  create: jest.fn(),
  getUserById: jest.fn(),
  updateUser: jest.fn(),
};
const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
}) as unknown as Request;

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe.only('UserController', () => {
  let controller: UserController;
  let req: Request;
  let res: Response;
  beforeEach(() => {
    controller = new UserController(mockUserUseCase as UserUseCase);
    res = mockResponse();
  });
  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const users = [{ id: '1', name: 'John', surname: 'Doe' }];
      (mockUserUseCase.findAll as jest.Mock).mockResolvedValue(users);
      await controller.getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe('createUser', () => {
    it('should create a user and return 201 status', async () => {
      const user = { id: '1', name: 'John', surname: 'Doe' };
      req = mockRequest(user);

      await controller.createUser(req, res);

      expect(mockUserUseCase.create).toHaveBeenCalledWith(expect.any(CreateUserCommand));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const user = { id: '1', name: 'John', surname: 'Doe' };
      req = mockRequest({}, { id: '1' });
      (mockUserUseCase.getUserById as jest.Mock).mockResolvedValue(Promise.resolve(user));
      await controller.getUserById(req, res);
      expect(res.json).toHaveBeenCalledWith(user);
    });
    it('should return 404 if user not found', async () => {
      req = mockRequest({}, { id: '1' });
      (mockUserUseCase.getUserById as jest.Mock).mockResolvedValue(null);
      await controller.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "user not found" });
    });
  });
  describe('updateUser', () => {
    it('should update a user and return the updated user', async () => {
      const user = { name: 'Jane', surname: 'Doe' };
      req = mockRequest(user, { id: '1' });
      await controller.updateUser(req, res);
      expect(mockUserUseCase.updateUser).toHaveBeenCalledWith('1', expect.any(UpdateUserCommand));
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
});