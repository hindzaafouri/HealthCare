import { Answer } from "./Answer";

export interface Comment {
    idComment: number;
    comment: string ;
    answer: Answer ;
}