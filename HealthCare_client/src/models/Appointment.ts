import { StateAppointment } from "./StateAppointment";
import { User } from "./User";

export class Appointment {
    id_appointment!: number;
    date!: Date;
    heure!: string;
    stateAppointment!: string;
    department!: string;
    message!:string;
    user!: User;
    medecin !:string;
}
