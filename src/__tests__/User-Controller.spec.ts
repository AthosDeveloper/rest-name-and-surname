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
 surname: "green"
};
describe.only("UserController", ()=> {
    describe("getUsers", ()=> {
        it("should return an array of users in JSON format", ()=> {
const req = {} as Request;
            const res = mockResponse();
mockUserRepository.findAll.mockReturnValue([mockUser]);
userController.getUsers(req, res);
expect(res.status).toHaveBeenCalledWith(200);
expect(res.json).toHaveBeenCalledWith([mockUser]);

        });    
});
describe("getUserById", () => {
it("should have be return an user by id in JSON format", () => {
    const req = mockRequest();
    const res = mockResponse();
    mockUserRepository.findById.mockReturnValue(mockUser);
    req.params.id = mockUser.uid;
    userController.getUserById(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);

});
it("should return an error message if user not found", () => {
    const req = mockRequest();
    const res = mockResponse();
    mockUserRepository.findById.mockReturnValue(undefined);
 userController.getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("user not found");
});
describe("updateUser", () => {
    it("should update a user by id in JSON format", ()=> {
        const req = mockRequest();
        const res = mockResponse();
        mockUserRepository.update.mockReturnValue(mockUser);
        req.params.id = mockUser.uid;
        req.body = mockUser;
        userController.updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200); 
expect(res.json).toHaveBeenCalledWith(mockUser);

    });
    it("should return an error message if user not found", () => {
        const req = mockRequest();
        const res = mockResponse();
mockUserRepository.update.mockReturnValue(undefined);
req.params.id = mockUser.uid;
req.body = mockUser;

const err = Error as Error;
expect(res.status).toHaveBeenCalledWith(404);
expect(res.json).toHaveBeenCalledWith(mockUser);
expect(res.send).toHaveBeenCalledWith(err.message);
    });
});
});


});
