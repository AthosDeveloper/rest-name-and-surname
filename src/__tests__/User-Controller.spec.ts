import { Request, Response } from "express";
import { User } from "../model/User";
import { UserController } from "../controller/UserController";
import { UserRepository } from "../repository/UserRepository";
import { uid } from "uid";
const mockUserRepository: UserRepository = {
  findAll: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};
const userController = new UserController(mockUserRepository);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn();
  res.json = jest.fn();
  res.send = jest.fn();
  return res;
};
const mockUser: User = {
  uid: uid(),
  name: "david",
  surname: "green",
};
describe("UserController", () => {
  describe("getUsers", () => {
    it("should return an array of users in JSON format", () => {
      const req = {} as Request;
      const res = mockResponse();
      //@ts-ignore
      mockUserRepository.findAll.mockReturnValue([mockUser]);
      userController.getUsers(req, res);
      expect(res.json).toHaveBeenCalledWith([mockUser]);
    });
  });
});
