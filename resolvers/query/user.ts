import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { UsersCollection } from "../../lib/db.ts";


const user = async (_: unknown, { id }: any) => {
    const user = await UsersCollection.findOne({ _id: new ObjectId(id) });
    return user;
}

interface GetUsersArgs {
    limit: number;

}

const users = async (_: unknown, { limit }: GetUsersArgs) => {
    const users = await UsersCollection.find().limit(limit).toArray();
    return users;
}

export {user, users};