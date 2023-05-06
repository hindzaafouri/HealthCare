import { Answer } from "./Answer";
import { User } from "./User";

export interface Thread {
    idThread: number;
    titleThread: string;
    votes: number;
    topicThread: string;
    questionThread: string;
    createdAt: Date;
    status: boolean;
    coverPhotoThread:string ;
    user:User ;
    answers: Answer[];
}