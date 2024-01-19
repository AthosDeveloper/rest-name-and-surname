
import { User } from "../../model/User";
import { UserRepositoryImpl } from "../../repository/UserRepositoryImpl";
import { uid } from "uid";
const userRepository = new UserRepositoryImpl();
const user1 = {
    uid: uid(),
    name: "athos",
    surname: "caetano"
};
const user2: User = {
    uid: uid(),
    name: "mary",
    surname: "perkins"
};
const user3: User = {
    uid: uid(),
    name: "frank",
    surname: "price"
};

describe("userRepositoryImpl", () => {
    test("save should assign a uid and add the user to the array", () => {
        userRepository.save(user1);
        expect(user1.uid).toBeDefined();
        expect(userRepository.users).toContain(user1);
    });
    test("findAll should return all the users in the users array", () => {
        userRepository.save(user2);
        const users = userRepository.findAll();
        expect(users.length).toBe(userRepository.users.length);
        expect(users).toContain(user1);
        expect(users).toContain(user2);
    });
    test("find by id should return the user with the given uid or null if not found", () => {
        const uid1 = user1.uid;
        const user = userRepository.findById(uid1);
        expect(user).toBe(user1);
        const invalidUid = "invalid";
        const nullUser = userRepository.findById(invalidUid);
        expect(nullUser).toBeNull();
    });
    test("update should update the user with the given uid or throw an error if not found", () => {
        const uid2 = user2.uid;
        const newUser: User = {
            uid: uid2,
            name: "athos",
            surname: "caetano Portal"
        };
        userRepository.update(uid2, newUser);
        const updatedUser = userRepository.findById(uid2);
        expect(updatedUser).toBe(newUser);
        const invalidUid = "invalid";
        expect(() => userRepository.update(invalidUid, newUser)).toThrowError(
            `user with ${invalidUid} not found`);
    });
});