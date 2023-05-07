import { UsersCollection } from "../../lib/db.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

interface Input {
    input: CreateUserInput;
}


const createUser = async (_: unknown, args: Input) => {
    const { name, email, password } = args.input;
    // Check if user already exists
    const userExists = await UsersCollection.findOne({ email: email });
    if (userExists) {
        throw new Error("User already exists");
    }
    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        throw new Error("Email is not valid");
    }
    // Check if password is valid (min 8 chars)
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
    const hashedPassword = await bcrypt.hash(password);
    const id = await UsersCollection.insertOne({
        name:name,
        email:email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const user = await UsersCollection.findOne({ _id: id });
    return user;
}

export default createUser;