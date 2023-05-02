import { Thread } from "./Thread";

export interface Answer {
    idAnswer: number;
    answer: string ;
    votes: number ;
    createdAt: Date;
    thread: Thread ;
    comments: Comment[]
}