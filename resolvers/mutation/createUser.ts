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
    try {
        const { name, email, password } = args.input;

    const userExists = await UsersCollection.findOne({ email: email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        throw new Error("Email is not valid");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
    console.log("Hashing password")
    const hashedPassword = await bcrypt.hash(password);
    console.log("Hashed password")
    const id = await UsersCollection.insertOne({
        name:name,
        email:email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    console.log("User created")

    const user = await UsersCollection.findOne({ _id: id });
    return user;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to create user: ${error}`);
    }
}

export default createUser;