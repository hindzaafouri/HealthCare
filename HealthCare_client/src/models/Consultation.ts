import { User } from "./User"

export interface Consultation {
  id: number
  description : string
  start_date: Date
  end_date: Date
  url_meeting: string
  patient: User
  doctor : User
}
