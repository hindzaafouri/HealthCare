import { User } from "./User";

export class Complaint {
    idComplaint!: number;
    subject!: string;
    content!: string;
    date!: string;
    state!: string;
    user!: User;
  }
  