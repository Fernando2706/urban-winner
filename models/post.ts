import { ObjectId } from 'https://deno.land/x/mongo@v0.31.2/mod.ts';


export interface Post {
    _id: ObjectId;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    comments: string[];
}