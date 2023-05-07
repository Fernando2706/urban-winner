import { ObjectId } from "https://deno.land/x/web_bson@v0.3.0/mod.js";
import { CommentsCollection, UsersCollection } from "../../lib/db.ts";

interface CreateReplyArgs {
    body: string;
    userEmail: string;
    commentId: string;
}

interface Input {
    input: CreateReplyArgs;
}

const createReply = async (_: unknown, args: Input) => {
    const { body, userEmail, commentId } = args.input;

    const user = await UsersCollection.findOne({ email: userEmail });
    if (!user) {
        throw new Error("User not found");
    }

    const comment = await CommentsCollection.findOne({ _id: new ObjectId(commentId) });
    if (!comment) {
        throw new Error("Comment not found");
    }

    const id = await CommentsCollection.insertOne({
        body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: userEmail,
        replies: [],
    });

    await CommentsCollection.updateOne(
        { _id: new ObjectId(commentId) },
        { $push: { replies: id } },
    );

    const reply = await CommentsCollection.findOne({ _id: id });

    return reply;

}

export default createReply;