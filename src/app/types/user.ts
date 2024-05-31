import { ParadoxInfo } from "./paradox-info";
import { UserHistory } from "./user-history";
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }
export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role; // Assuming Role is an enum type
    favoriteParadoxes: ParadoxInfo[];
    browsingHistory: UserHistory[];
  }