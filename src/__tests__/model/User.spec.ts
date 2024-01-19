import { uid } from "uid";
import { User } from "../../model/User";
const userModel: User = {
uid: "123",
name: "alice",
surname: "smit"
};
describe("userInterface", () => {
    test("testing if user haz the same atributs", () => {
        expect(userModel).toMatchObject<User>(userModel);
    });
    test("userModelValues", () => {
        expect(userModel.uid).toBe("123");
        expect(userModel.name).toBe("alice");
        expect(userModel.surname).toBe("smit");
    });
})