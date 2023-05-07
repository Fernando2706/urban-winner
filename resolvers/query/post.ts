import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { PostsCollection } from "../../lib/db.ts";

interface Post {
    id: string;
}

const post = async (_: unknown, { id }: Post) => {
    const post = await PostsCollection.findOne({ _id: new ObjectId(id) });
    return post;
}

interface GetPostsArgs {
    limit: number;
    page: number;
}

const posts = async (_: unknown, { limit, page }: GetPostsArgs) => {
    const posts = await PostsCollection.find().limit(limit).skip(page * limit).toArray();
    return posts;
}

export {post, posts};