import createUser from "./createUser.ts";
import createPost from "./createPost.ts";
import createComment from "./createComment.ts";
import createReply from "./createReply.ts";

const Mutation = {
    createUser,
    createPost,
    createComment,
    createReply
}

export default Mutation