import { UserProfile } from "../models/User.model";

declare global {
  namespace Express{
    export interface Request{
      user:Partial<UserProfile>
    }
  }
}