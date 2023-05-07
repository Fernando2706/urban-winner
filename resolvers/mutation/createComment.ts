import { ObjectId } from "https://deno.land/x/web_bson@v0.3.0/mod.js";
import { CommentsCollection, PostsCollection, UsersCollection } from "../../lib/db.ts";


interface CreateCommentArgs {
    body: string;
    userEmail: string;
    postId: string;
}

interface Input {
    input: CreateCommentArgs;
}

const createComment = async (_: unknown, args: Input) => {
    const { body, userEmail, postId } = args.input;

    const user = await UsersCollection.findOne({ email: userEmail });
    if (!user) {
        throw new Error("User does not exist");
    }

    const post = await PostsCollection.findOne({ _id: new ObjectId(postId) });
    if (!post) {
        throw new Error("Post does not exist");
    }
    const id = await CommentsCollection.insertOne({
        body: body,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: userEmail,
        replies: [],
    });

    await PostsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: id.toHexString() } }
    );
        
    const comment = await CommentsCollection.findOne({ _id: id });
    return comment;
    
}

export default createComment;