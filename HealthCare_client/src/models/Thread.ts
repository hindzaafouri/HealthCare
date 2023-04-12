export interface Thread {
    idThread: number;
    titleThread: string;
    votes: number;
    topicThread: string;
    questionThread: string;
    createdAt: Date;
    status: boolean;
    coverPhotoThread:string ;
    //answers: Answer[];
}