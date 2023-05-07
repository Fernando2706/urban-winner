import { ObjectId } from 'https://deno.land/x/mongo@v0.31.2/mod.ts';

interface User {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}


export default User;