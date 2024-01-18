import { Request, Response } from "express";
import { User } from "../model/User";
import { UserController } from "../controller/UserController";
import { UserRepository } from "../repository/UserRepository";
import { uid } from "uid";
jest.mock("../repository/UserRepository");
const mockUserRepository: UserRepository = {
findAll: jest.fn(),
save: jest.fn(),
findById: jest.fn(),
update: jest.fn(),
};

const userController = new UserController(mockUserRepository);

const mockResponse = () => {
 const mockRes = {json: jest.fn(),
send: jest.fn()};
   const res = {} as Response;
  res.status = jest.fn().mockReturnValue(mockRes);
  res.json = mockRes.json;
  res.send = mockRes.send;
  return res;
};
const mockRequest = () => {
  const req = {} as Request;
  req.body = {};
req.params = {};
return req;
};
const mockUser: User = {
  uid: "1",
  name: "david",
  surname: "green",
};
beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
describe("UserController", () => {
  describe("getUsers", () => {
    it("should return an array of users in JSON format", () => {
      const req = mockRequest();
      const res = mockResponse();
      
      //@ts-ignore
      mockUserRepository.findAll.mockReturnValue([mockUser]);
      userController.getUsers(req, res);
      expect(res.json).toHaveBeenCalledWith([mockUser]);
    });
    });  
  describe("getUserById", () => { 
    it("should be return a user id in JSON format", () => {
const req = mockRequest();
const res = mockResponse();
req.params.id = mockUser.uid;
req.body = mockUser;
      //@ts-ignore
mockUserRepository.findById.mockReturnValue(mockUser);
userController.getUserById(req, res);
expect(res.json).toHaveBeenCalledWith(mockUser);
    });
it("should return error 404 if user not found", () => {
  const req = mockRequest();
  const res = mockResponse();
  req.params.id = null;
    //@ts-ignore
mockUserRepository.findById.mockReturnValue(undefined);
  userController.getUserById(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith( {message: "user not found"});  
});
});
describe("createUser", () => {
  it("should be created a user in JSON format", () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = mockUser;
    
    //@ts-ignore
mockUserRepository.save.mockReturnValue(mockUser);
 userController.createUser(req, res);
expect(res.status).toHaveBeenCalledWith(200);
expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});
  describe("updateUser", () => {
 
it("should update a User with success", () => {
      const req = mockRequest();
        const res = mockResponse();
        
      req.params.id = mockUser.uid;
      req.body = mockUser;
      //@ts-ignore 
      mockUserRepository.update.mockReturnValue(mockUser);
      userController.updateUser(req, res);
expect(res.status).toHaveBeenCalledWith(200);
expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});
});