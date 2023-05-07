import User from "../models/user.ts"
import Mutation from "./mutation/mod.ts";
import Query from "./query/index.ts"

import { CommentsCollection, UsersCollection } from "../lib/db.ts";
import { Post } from "../models/post.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { Comment } from "../models/comment.ts";

const resolvers = {
    Query,
    Mutation,
    User: {
        id: (user: User) => user._id.toHexString()
    },
    Post: {
        id: (post: Post) => post._id.toHexString(),
        comments: async (post: Post) => {
            const idsConverted = post.comments.map((id: string) => new ObjectId(id));
            return await CommentsCollection.find({ _id: { "$in": idsConverted } }).toArray();
        }
    },
    Comment: {
        id: (comment: Comment) => comment._id.toHexString(),
        user: async (comment: Comment) => {
            return await UsersCollection.findOne({ email: comment.user });
        }
    }
}

export default resolvers