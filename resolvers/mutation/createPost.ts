import { PostsCollection } from "../../lib/db.ts";

interface CreatePostArgs {
    body: string;
    title: string;
    imageUrl: string;
}

interface Input {
    input: CreatePostArgs;
}

const createPost = async (_: unknown, args: Input) => {
    const { body, title, imageUrl } = args.input;

    const id = await PostsCollection.insertOne({
        title: title,
        body: body,
        imageUrl: imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
    });

    const post = await PostsCollection.findOne({ _id: id });

    return post;
}

export default createPost;