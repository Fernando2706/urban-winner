import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import User from "../models/user.ts";
import { Post } from "../models/post.ts";
import { Comment } from "../models/comment.ts"

const dbUrl = Deno.env.get("DB_URL") || "mongodb://localhost:27017";

const client = new MongoClient();


await client.connect(
    dbUrl,
);

export const UsersCollection = client.database("app").collection<User>("users");
export const PostsCollection = client.database("app").collection<Post>("posts");
export const CommentsCollection = client.database("app").collection<Comment>("comments");
