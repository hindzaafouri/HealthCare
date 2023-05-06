import { Thread } from "./Thread";
import { User } from "./User";

export interface Answer {
    idAnswer: number;
    user:User ;
    answer: string ;
    votes: number ;
    createdAt: Date;
    thread: Thread ;
    comments: Comment[]
}