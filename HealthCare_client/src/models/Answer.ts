import { Thread } from "./Thread";

export interface Answer {
    idAnswer: number;
    answer: String ;
    votes: number ;
    createdAt: Date;
    thread: Thread ;
}