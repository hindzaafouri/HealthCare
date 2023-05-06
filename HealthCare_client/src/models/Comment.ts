import { Answer } from "./Answer";
import { User } from "./User";

export interface Comment {
    idComment: number;
    comment: string ;
    answer: Answer ;
    user : User ; 
}