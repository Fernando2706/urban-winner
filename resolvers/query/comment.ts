import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { CommentsCollection } from "../../lib/db.ts";

interface Comment{
    id: string;
}

const comment = async (_: unknown, { id }: Comment) => {
    const comment = await CommentsCollection.findOne({ _id: new ObjectId(id) });
    return comment;
}

interface GetCommentsArgs {
    limit: number;
}

const comments = async (_: unknown, { limit }: GetCommentsArgs) => {
    const comments = await CommentsCollection.find().limit(limit).toArray();
    return comments;
}

export {comment, comments};
