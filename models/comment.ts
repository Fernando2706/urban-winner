import { ObjectId } from 'https://deno.land/x/mongo@v0.31.2/mod.ts';

export interface Comment {
    _id: ObjectId;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    user: string;
}